import http  from "../utils/http-common";
import {Category} from "../models/category.type";

class CategoryService {
    getAll() {
        return http.get<Array<Category>>("/categories");
    }

    get(id: number) {
        return http.get<Category>(`/categories/${id}`);
    }

    create(category: Category) {
        return http.post<Category>("/categories", category);
    }

    update(category: Category, id: number) {
        return http.put<any>(`/categories/${id}`, category);
    }

    delete(id: number) {
        return http.delete<any>(`/categories/${id}`);
    }
}

export default new CategoryService();
