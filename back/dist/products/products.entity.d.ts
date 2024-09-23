import { Category } from "src/category/entities/category.entity";
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    category: Category;
}
