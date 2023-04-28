import {NextFunction, Request, Response} from "express";

import currencyService from "../service/currency-service";

import {ICurrencies} from "../types/controllers/currency-controller";

class CurrencyController {
    async getCurrency(req: Request, res: Response, next: NextFunction) {
        try {
            const currencies: ICurrencies[] = await currencyService.getCurrency();
            res.status(200).json({
                status: 200,
                message: "Валюты успешно получены",
                result: currencies
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new CurrencyController();
