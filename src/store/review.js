import reviewService from "../services/ReviewService";

export default {
  state: {
    reviews: [],
  },
  getters: {
    reviews(state) {
      return state.reviews;
    },
  },
  mutations: {
    ADD_REVIEW(state, payload) {
      state.reviews = payload;
    },
  },
  actions: {
    async createReview(_, formData) {
      const { data } = await reviewService.createReview(formData);
      if (data.status === 200) {
        return {
          message: data.message,
          result: true,
        };
      }
    },
    async getReview({ commit }) {
      const { data } = await reviewService.getReview();
      if (data.status === 200) {
        commit(
          "ADD_REVIEW",
          data.result
            .slice(-6)
            .sort((a, b) => {
              return a.id - b.id;
            })
            .reverse(),
        );
      }
    },
  },
};
