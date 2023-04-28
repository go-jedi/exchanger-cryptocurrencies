import $api from "../http/index";

export default class PayService {
  static getWallets() {
    return $api.get("/wallet");
  }
}
