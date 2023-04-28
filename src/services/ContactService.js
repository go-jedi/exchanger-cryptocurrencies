import $api from "../http/index";

export default class ReviewService {
  static async createContact(formData) {
    return $api.post("/contact", formData);
  }
}
