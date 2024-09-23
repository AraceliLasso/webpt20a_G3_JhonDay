import { ProductService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductResponseDto } from "./dto/response-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(page?: number, limit?: number): Promise<import("./products.entity").Product[]>;
    findOne(id: string): Promise<import("./products.entity").Product>;
    createProduct(createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    updateProduct(id: string, updateProduct: UpdateProductDto): Promise<import("./products.entity").Product>;
    deleteProduct(id: string): Promise<{
        id: string;
    }>;
}
