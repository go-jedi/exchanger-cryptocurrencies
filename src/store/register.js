import authService from "../services/AuthService";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async registration(_, formData) {
      const response = await authService.registration(formData);
      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.result.accessToken);
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
