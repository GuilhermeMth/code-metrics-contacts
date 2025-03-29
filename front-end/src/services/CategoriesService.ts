import { ICategory } from "../@types/Category";
import api from "../configs/api";

class CategoriesService {
  async getCategories() {
    const response = await api.get<ICategory[]>("/categories");
    return response.data;
  }
}

export default new CategoriesService();
