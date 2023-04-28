import {Response} from "express";
import bcrypt from "bcrypt";
import {v4} from "uuid";

import db from "../db";

import passwordGenerate from "../helpers/generate-password";
import generateTime from "../helpers/generate-time";

import {
    IContactUser,
    IGetReviews,
    IGetUsers,
    IReturnRegistration,
    ITokenFromDb,
    IUserData,
    IUserDto,
    IWallet
} from "../types/service/user-service";

import ApiError from "../exceptions/api-error";
import UserDto from "../dtos/user-dto";
import MailService from "./mail-service";
import mailService from "./mail-service";
import TokenService from "./token-service";

class UserService {
    async registration(res: Response, username: string, email: string, password: string): Promise<IReturnRegistration> {
        const candidate = await db.query("SELECT * FROM users WHERE email = $1", [email]); // проверяем есть ли в базе данных пользователь с данным email
        if (candidate.rows.length > 0) { // если пользователь с данным email существует, то мы вызываем ошибку: "что пользователь уже существует"
            // throw ApiError.BadRequest(`Пользователь с такой почтой уже существует`);
            res.status(400).json({
                status: 400,
                message: "Пользователь с такой почтой уже существует"
            });
        }
        const hashPassword: string = bcrypt.hashSync(password, 3); // хешируем пароль пользователя
        const activationLink: string = v4(); // создаем ссылку активации используя uuid v4
        const user = await db.query(
            "INSERT INTO users (username, email, password, activation_link) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, email, hashPassword, activationLink],
        ); // создаем пользователя
        await MailService.sendActivationMail(
            email,
            `${process.env.API_URL}/api-v1/activate/${activationLink}`,
        ); // отправляем пользователю активационное письмо на почту

        const userDto: IUserDto = new UserDto(user.rows[0]); // используем класс UserDto, чтобы получить поля: id, email, isActivated, т.к чтобы использовать для генерации токена
        const tokens = await TokenService.generateToken({ // вызываем метод в TokenService generateToken для генерации токена и передаём данные: id, email, isActivated
            ...userDto,
        });
        await TokenService.saveToken(userDto.id, tokens.refreshToken); // в методе saveToken сохраняем токен refresh

        return { // возвращаем токена (access и refresh) и данные пользователя
            ...tokens,
            user: userDto,
        };
    }

    async login(res: Response, email: string, password: string): Promise<IReturnRegistration> {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]); // проверяем есть ли в базе данных пользователь с данным email
        if (!user.rows.length) { // если пользователя с данным email не существует, то вызываем ошибку: "Что пользователь с данным email не найден"
            // throw ApiError.BadRequest(`Пользователь с таким ${email} не найден`);
            res.status(400).json({
                status: 400,
                message: "Пользователь с такой почтой не найден"
            });
        }
        const isPassEquals: boolean = await bcrypt.compare(password, user.rows[0].password); // сравниваем захешированный пароль с тем, который был передан пользователем в req.body
        if (!isPassEquals) { // если они не совпадают, то вызываем ошибку: "Неправильный логин или паролль"
            // throw ApiError.BadRequest("Неправильный логин или пароль");
            res.status(400).json({
                status: 400,
                message: "Неправильный логин или пароль"
            });
        }
        const userDto: IUserDto = new UserDto(user.rows[0]);  // используем класс UserDto, чтобы получить поля: id, email, isActivated, т.к чтобы использовать для генерации токена
        const tokens = await TokenService.generateToken({ // вызываем метод в TokenService generateToken для генерации токена и передаём данные: id, email, isActivated
            ...userDto,
        });
        await TokenService.saveToken(userDto.id, tokens.refreshToken); // в методе saveToken сохраняем токен refresh

        return { // возвращаем токена (access и refresh) и данные пользователя
            ...tokens,
            user: userDto,
        };
    }

    async logout(refreshToken: string): Promise<number> {
        return await TokenService.removeToken(refreshToken); // вызываем метод removeToken у TokenService
    }

    async recovery(res: Response, email: string) {
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (!user.rows.length) {
            res.status(400).json({
                status: 400,
                message: "Пользователь с данным email не найден"
            });
        }

        const newPassword: string = passwordGenerate;
        const hashPassword: string = bcrypt.hashSync(newPassword, 3);
        await mailService.sendRecoveryMail(email, newPassword);
        await db.query("UPDATE users set password = $1 WHERE email = $2 RETURNING *", [hashPassword, email]);
    }

    async activate(res: Response, activationLink: string): Promise<void> { // метод для активации аккаунта
        const user = await db.query("SELECT * FROM users WHERE activation_link = $1", [activationLink]); // ищем пользователя у которого activation_link равен тому, который мы передали
        if (!user.rows.length) { // если пользователь не найден, то мы вызываем ошибку: "Неккоректная ссылка активации"
            // throw ApiError.BadRequest(`Неккоректная ссылка активации`);
            res.status(400).json({
                status: 400,
                message: "Некорректная ссылка активации"
            });
        }

        await db.query("UPDATE users set is_activated = $1 WHERE activation_link = $2", [
            true,
            activationLink,
        ]); // ищем пользователя у которого activation_link равен тому, который мы передали и меняем значение is_activated с false на true
    }

    async refresh(refreshToken: string): Promise<IReturnRegistration> {
        if (!refreshToken) { // если refreshToken нет, то вызываем ошибку
            throw ApiError.UnauthorizedError();
        }
        const userData: IUserData = await TokenService.validateRefreshToken(refreshToken); // вызываем метод validateRefreshToken из TokenService, чтобы проверить валидность refresh токена
        const tokenFromDb: ITokenFromDb[] = await TokenService.findToken(refreshToken); // вызываем метод findToken из TokenService
        if (!userData || !tokenFromDb) { // если токен не валидный или его нет то вызываем ошибку
            throw ApiError.UnauthorizedError();
        }
        const user = await db.query("SELECT * FROM users WHERE id = $1", [userData.id]); // ищем пользователя по id
        const userDto: IUserDto = new UserDto(user.rows[0]); // используем класс UserDto, чтобы получить поля: id, email, isActivated, т.к чтобы использовать для генерации токена
        const tokens = await TokenService.generateToken({ // вызываем метод в TokenService generateToken для генерации токена и передаём данные: id, email, isActivated
            ...userDto,
        });
        await TokenService.saveToken(userDto.id, tokens.refreshToken); // в методе saveToken сохраняем токен refresh

        return { // возвращаем токена (access и refresh) и данные пользователя
            ...tokens,
            user: userDto,
        };
    }

    async review(res: Response, name: string, email: string, message: string): Promise<void> {
        await db.query("INSERT INTO review (name_user, email, date_create, message) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, generateTime, message]);
    }

    async contact(name: string, email: string, id_exchange: string, message: string): Promise<void> {
        await db.query("INSERT INTO contact (name_user, email, id_exchange, message) VALUES ($1, $2, $3, $4)", [name, email, id_exchange, message]);
        const userData: IContactUser = {
            name,
            email,
            id_exchange,
            message
        };

        await mailService.sendContactMail("sasfwq1@gmail.com", userData);
    }

    async createWallet(nameWallet: string, addressWallet: string): Promise<IWallet[]> {
        const newWallet = await db.query("INSERT INTO wallet (name_wallet, address_wallet) VALUES ($1, $2) RETURNING *", [nameWallet, addressWallet]);
        return newWallet.rows;
    }

    async getReviews(): Promise<IGetReviews[]> {
        const reviews = await db.query("SELECT * FROM review");

        return reviews.rows;
    }

    async getWallets(): Promise<IWallet[]> {
        const wallets = await db.query("SELECT * FROM wallet");

        return wallets.rows;
    }

    async getUsers(): Promise<IGetUsers[]> {
        const users = await db.query("SELECT * FROM users"); // получаем всех пользователей из бд

        return users.rows; // возвращаем пользователей
    }
}

export default new UserService();
