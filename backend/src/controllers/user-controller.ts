import {NextFunction, Request, Response} from "express";
import {Result, ValidationError, validationResult} from "express-validator";

import {IReviews, IUserDto, IWallet} from "../types/controllers/user-controller";

import UserService from "../service/user-service";
import userService from "../service/user-service";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors: Result<ValidationError> = validationResult(req); // проверяем на наличие ошибок валидации
            if (!errors.isEmpty()) { // если ошибки есть, то вызываем ошибку: "Ошибка при валидации"
                // return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
                return res.status(400).json({
                    status: 400,
                    message: "Ошибка при валидации"
                });
            }
            const {username, email, password} = req.body; // достаём из req.body email и password
            const userData: IUserDto = await UserService.registration(res, username, email, password); // вызываем из UserService метод registration
            res.cookie("refreshToken", userData.refreshToken, { // записываем refresh токен в cookie
                maxAge: 30 * 24 * 60 * 60 * 1000, // время жизни токена
                httpOnly: true, // чтобы нельзя было в браузере с помощью js менять данную куку
            });
            return res.status(200).json({ // возвращаем пользователю результат регистрации
                status: 200,
                message: "Пользователь успешно зарегистрирован",
                result: userData,
            });
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) { // метод для авторизации
        try {
            const errors: Result<ValidationError> = validationResult(req); // проверяем на наличие ошибок валидации
            if (!errors.isEmpty()) { // если ошибки есть, то вызываем ошибку: "Ошибка при валидации"
                // return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
                return res.status(400).json({
                    status: 400,
                    message: "Ошибка при валидации"
                });
            }
            const {email, password} = req.body; // достаём из req.body email и password
            const userData = await UserService.login(res, email, password); // вызываем из UserService метод login
            res.cookie("refreshToken", userData.refreshToken, { // записываем refresh токен в cookie
                maxAge: 30 * 24 * 60 * 60 * 1000, // время жизни токена
                httpOnly: true, // чтобы нельзя было в браузере с помощью js менять данную куку
            });
            return res.status(200).json({ // возвращаем пользователю результат авторизации
                status: 200,
                message: "Пользователь успешно авторизовался",
                result: userData,
            });
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) { // метод для выхода из аккаунта
        try {
            const {refreshToken} = req.cookies; // достаём refresh токен из req.cookies
            const token = await UserService.logout(refreshToken); // вызываем метод logout из UserService
            res.clearCookie("refreshToken"); // очищаем поле refreshToken
            return res.status(200).json({ // возвращаем пользователю результат выхода из аккаунта
                status: token === 1 ? 200 : 400,
                message: token === 1 ? "Пользователь успешно вышел" : "Ошибка выхода с аккаунта",
                result: token === 1 ? true : false,
            });
        } catch (error) {
            next(error);
        }
    }

    async recovery(req: Request, res: Response, next: NextFunction) {
        try {
            const errors: Result<ValidationError> = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: 400,
                    message: "Ошибка при валидации"
                });
            }
            const {email} = req.body;
            await userService.recovery(res, email);
            return res.status(200).json({
                status: 200,
                message: `Успешное восстановление пароля`
            });
        } catch (error) {
            next(error);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) { // метод для активации аккаунта
        try {
            const activationLink: string = req.params.link; // достаём из req.params ссылку активации
            await UserService.activate(res, activationLink); // вызываем метод activate из UserService
            return res.redirect("http://localhost:8080/?activeLink=true"); // делаем редирект на страницу yandex.ru
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) { // метод для обновления токена
        try {
            const {refreshToken} = req.cookies; // достаём refresh токен из req.cookies
            const userData = await UserService.refresh(refreshToken); // вызываем метод refresh из UserService
            res.cookie("refreshToken", userData.refreshToken, { // записываем refresh токен в cookie
                maxAge: 30 * 24 * 60 * 60 * 1000, // время жизни токена
                httpOnly: true, // чтобы нельзя было в браузере с помощью js менять данную куку
            });
            return res.status(200).json({ // возвращаем пользователю результат обновление refresh токена
                status: 200,
                message: "Токен успешно обновлён",
                result: userData,
            });
        } catch (error) {
            next(error);
        }
    }

    async review(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, email, message} = req.body;
            await UserService.review(res, name, email, message);
            res.status(200).json({
                status: 200,
                message: "Отзыв успешно отправлен"
            });
        } catch (error) {
            next(error);
        }
    }

    async getReviews(req: Request, res: Response, next: NextFunction) {
        try {
            const reviews: IReviews[] = await UserService.getReviews();
            return res.status(200).json({
                status: 200,
                message: "Успешное получение отзывов",
                result: reviews
            });
        } catch (error) {
            next(error);
        }
    }

    async contact(req: Request, res: Response, next: NextFunction) {
        try {
            const errors: Result<ValidationError> = validationResult(req); // проверяем на наличие ошибок валидации
            if (!errors.isEmpty()) { // если ошибки есть, то вызываем ошибку: "Ошибка при валидации"
                // return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
                return res.status(400).json({
                    status: 400,
                    message: "Ошибка при валидации"
                });
            }
            const {name, email, id_exchange, message} = req.body;
            await UserService.contact(name, email, id_exchange, message);
            res.status(200).json({
                status: 200,
                message: "Сообщение успешно отправлено",
            });
        } catch (error) {
            next(error);
        }
    }

    async createWallet(req: Request, res: Response, next: NextFunction) {
        try {
            const {name_wallet, address_wallet} = req.body;
            const wallet: IWallet[] = await UserService.createWallet(name_wallet, address_wallet);
            return res.status(200).json({
                status: 200,
                message: "Успешное создание кошелька",
                result: wallet
            });
        } catch (error) {
            next(error);
        }
    }

    async getWallets(req: Request, res: Response, next: NextFunction) {
        try {
            const walletData: IWallet[] = await UserService.getWallets();
            return res.status(200).json({
                status: 200,
                message: "Успешное получение кошельков",
                result: walletData
            });
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) { // метод для получения всех пользователей
        try {
            const userData = await UserService.getUsers(); // вызываем метод getUsers из UserService
            return res.status(200).json({ // возвращаем пользователю результат получения всех пользователей
                status: 200,
                message: "Успешное получение пользователей",
                result: userData,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
