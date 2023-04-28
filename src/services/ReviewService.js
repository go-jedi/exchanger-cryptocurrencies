import $api from "../http/index";

export default class ReviewService {
  static async createReview(formData) {
    return $api.post("/review", formData);
  }

  static async getReview() {
    return $api.get("/review");
  }
}
