import {NextFunction, Response} from "express";

import ApiError from "../exceptions/api-error";
import tokenService from "../service/token-service";

export default async function (req: any, res: Response, next: NextFunction) {
    try {
        const authorizationHeader: string | undefined = req.headers.authorization; // достаём из headers поле authorization

        if (!authorizationHeader) { // если поля authorization нет, то мы вызываем ошибку, что пользователь не авторизован
            return next(ApiError.UnauthorizedError());
        }
        const accessToken: string | undefined = authorizationHeader.split(" ")[1]; // если authorization поле есть, то мы разбиваем его с помощью split на 2 части т.к (Bearer токен) и берем первый элемент из массива
        if (!accessToken) { // если его нет, то мы вызываем ошибку, что пользователь не авторизован
            return next(ApiError.UnauthorizedError());
        }
        const userData = await tokenService.validateAccessToken(accessToken); // вызываем метод validateAccessToken из tokenService где проверяем токен access на валидность

        if (!userData) { // если он не валидный то мы вызываем ошибку, что пользователь не авторизован
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData; // присваиваем req.user данные из userData
        next(); // вызываем ф-цию next
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
}
