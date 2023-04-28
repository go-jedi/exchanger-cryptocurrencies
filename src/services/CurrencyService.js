import $api from "../http/index";

export default class CurrencyService {
  static async getCurrency() {
    return $api.get("/currency");
  }
}
