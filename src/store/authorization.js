import authService from "@/services/AuthService";
import $api from "@/http/index";

export default {
  state: {
    isAuth: false,
  },
  getters: {},
  mutations: {
    CHANGE_IS_AUTH(state, payload) {
      state.isAuth = payload;
    },
  },
  actions: {
    async checkAuthorization({ commit }) {
      const response = await $api.get("/refresh");
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.result.accessToken);
        commit("CHANGE_IS_AUTH", true);
        return true;
      } else {
        return false;
      }
    },
    async authorization({ commit }, formData) {
      const response = await authService.login(formData);
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.result.accessToken);
        commit("CHANGE_IS_AUTH", true);
        return {
          message: response.data.message,
        };
      } else if (response.data.status === 400) {
        return {
          message: response.data.message,
        };
      }
    },
    async logout({ commit }) {
      const response = await authService.logout();
      if (response.data.status === 200) {
        localStorage.removeItem("token");
        commit("CHANGE_IS_AUTH", false);
        return true;
      }
    },
    async recovery(_, formData) {
      const response = await authService.recovery(formData);
      console.log("response.data", response.data);
      if (response.data.status === 200) {
        return {
          message: response.data.message,
        };
      } else if (response.data.status === 400) {
        return {
          message: response.data.message,
        };
      }
    },
  },
};
