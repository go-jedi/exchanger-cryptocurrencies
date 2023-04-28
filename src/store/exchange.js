import currencyService from "../services/CurrencyService";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getCryptoCurrenciesExchange() {
      const { data } = await currencyService.getCurrency();
      if (data.status === 200) {
        return data.result.sort((a, b) => {
          return a.id - b.id;
        });
      }
    },
  },
};
