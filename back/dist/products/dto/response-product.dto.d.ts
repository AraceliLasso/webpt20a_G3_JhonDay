import { Product } from "../products.entity";
export declare class ProductResponseDto {
    id: string;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    constructor(product: Product);
}
