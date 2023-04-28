import db from "../db";

import {ICurrencies} from "../types/service/currency-service";

class CurrencyService {
    async getCurrency(): Promise<ICurrencies[]> {
        const {rows} = await db.query("SELECT * FROM currencies");
        return rows;
    }
}

export default new CurrencyService();
