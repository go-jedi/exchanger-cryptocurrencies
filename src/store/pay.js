import payService from "@/services/PayService";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async getWallets() {
      const { data } = await payService.getWallets();
      if (data.status === 200) {
        return data.result
          .sort((a, b) => {
            return a.id - b.id;
          })
          .filter((e) => {
            return e.name_wallet === localStorage.getItem("giveCurrency");
          });
      }
    },
  },
};
