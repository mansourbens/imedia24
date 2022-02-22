import {Category} from "./category.type";

export interface Product {
    id?: number;
    category: Category;
    label: string;
    description: string;
    price: number;
}