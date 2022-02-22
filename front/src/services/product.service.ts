import http  from "../utils/http-common";
import {Product} from "../models/product.type";

class ProductService {
    getAll() {
        return http.get<Array<Product>>("/products");
    }

    get(id: string) {
        return http.get<Product>(`/products/${id}`);
    }

    create(product: Product) {
        return http.post<Product>("/products", product);
    }

    update(product: Product, id: number) {
        return http.put<any>(`/products/${id}`, product);
    }

    delete(id: number) {
        return http.delete<any>(`/products/${id}`);
    }


    getByCategory(id: number) {
        return http.get<any>(`/products/category/${id}`);
    }
}

export default new ProductService();
