interface ICurrenciesResult {
    id: number;
    type_currency: string;
    type_convert: string;
    name_currency: string;
    count_currency: number;
    can_convert: string[];
    img_logo: string;
}

export interface ICurrencies {
    "status": number;
    "message": string;
    "result": ICurrenciesResult[];
}
