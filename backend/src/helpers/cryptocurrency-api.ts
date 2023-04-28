import axios from "axios";

import db from "../db";

export const cryptoCurrencyGet = async () => {
    const arrNeedCurrency: string[] = ["BTC", "ETH", "USDT", "USDC", "RUB"];
    const response = await axios.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,USDT,USDC,RUB&tsyms=USD,RUB,BTC,USDT,USDC,ETH");

    const objUpdate = response.data;
    objUpdate["RUB"]["BTC"] = objUpdate["RUB"]["BTC"].toFixed(6);

    if (response.status === 200) {
        for (let i = 0; i < arrNeedCurrency.length; i++) {
            await db.query("UPDATE currencies SET quote_currency = $1::json", [objUpdate]);
        }
    }
};
