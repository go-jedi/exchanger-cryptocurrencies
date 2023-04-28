import contactService from "../services/ContactService";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async createContact(_, formData) {
      const { data } = await contactService.createContact(formData);
      if (data.status === 200) {
        return {
          message: data.message,
          result: true,
        };
      }
    },
  },
};
