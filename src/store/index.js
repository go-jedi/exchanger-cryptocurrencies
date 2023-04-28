import Vue from "vue";
import Vuex from "vuex";

import register from "./register";
import authorization from "./authorization";
import review from "./review";
import contact from "./contact";
import exchange from "./exchange";
import pay from "./pay";

import currencyService from "../services/CurrencyService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cryptos: [],
  },
  mutations: {
    ADD_CRYPTO(state, payload) {
      state.cryptos = payload;
    },
  },
  actions: {
    async getCryptoCurrencies({ commit }) {
      const { data } = await currencyService.getCurrency();
      if (data.status === 200) {
        commit(
          "ADD_CRYPTO",
          data.result.sort((a, b) => {
            return a.id - b.id;
          }),
        );
        localStorage.setItem("cryptosAll", JSON.stringify(data.result));
        localStorage.setItem("selectCurrency", JSON.stringify("Bitcoin BTC"));
        return data.result;
      }
    },
  },
  modules: {
    authorization,
    register,
    review,
    contact,
    exchange,
    pay,
  },
});
