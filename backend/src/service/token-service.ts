import jwt from "jsonwebtoken";

import db from "../db";
import {IFindToken, IPayload, IReturnTokens} from "../types/service/token-service";

class TokenService {
    async generateToken(payload: IPayload): Promise<IReturnTokens> { // метод для генерации токенов (access и refresh)
        const accessToken: string = jwt.sign(payload, "jwt-secret-key", {expiresIn: "60m"}); // генерируем access токен
        const refreshToken: string = jwt.sign(payload, "jwt-refresh-key", {expiresIn: "30d"}); // генерируем refresh токен

        return { // возвращаем токены access и refresh
            accessToken,
            refreshToken,
        };
    }

    async validateAccessToken(token: string) { // метод для проверки валидности Access токена
        try {
            const userData: any = jwt.verify(token, "jwt-secret-key");

            return userData;
        } catch (error) {
            return null;
        }
    }

    async validateRefreshToken(token: string) { // метод для проверки валидности Refresh токена
        try {
            const userData: any = jwt.verify(token, "jwt-refresh-key");

            return userData;
        } catch (error) {
            return null;
        }
    }

    async findToken(findToken: string): Promise<IFindToken[]> { // метод для нахождения refresh токена
        const tokenData = await db.query("SELECT * FROM token WHERE refresh_token = $1", [findToken]);

        return tokenData.rows;
    }

    async saveToken(userId: number, refreshToken: string): Promise<void> { // метод для сохранения токена пользователя
        const tokenData = await db.query("SELECT * FROM token WHERE user_id = $1", [userId]); // ищем токен по user_id
        if (tokenData.rows.length > 0) { // если он существует у пользователя, то мы его обновляем
            await db.query("UPDATE token set refresh_token = $1 WHERE user_id = $2", [
                refreshToken,
                userId,
            ]);
        } else { // иначе, если он не существует у пользователя, то мы его создаём
            await db.query("INSERT INTO token (user_id, refresh_token) VALUES ($1, $2)", [
                userId,
                refreshToken,
            ]);
        }
    }

    async removeToken(refreshToken: string): Promise<number> { // метод для удаления refreshToken
        const token = await db.query("DELETE FROM token WHERE refresh_token = $1", [refreshToken]); // находим и удаляем refresh токен у которого refresh_token равен тому, который мы передали

        return token.rowCount;
    }
}

export default new TokenService();
