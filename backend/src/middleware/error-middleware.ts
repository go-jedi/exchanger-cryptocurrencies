import {NextFunction, Request, Response} from "express";

import ApiError from "../exceptions/api-error";

export default function (err: ApiError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) { // если err принадлежит ApiError классу
        return res.status(err.status).json({ // возвращаем пользователю результат ошибки
            status: err.status,
            message: err.message,
            errors: err.errors,
        });
    }
    return res.status(500).json({ // иначе возвращаем пользователю
        status: 500,
        message: "Произошла непредвиденная ошибка",
    });
}
