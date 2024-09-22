import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }
    async create(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = this.productRepository.create(createProductDto);
        return await this.productRepository.save(newProduct);
    }

    async findAll(page: number, limit: number) {
        return await this.productRepository.find({
            take: limit,
            skip: (page - 1) * limit,
        });
    }

    async findOne(id: string): Promise<Product> {
        return await this.productRepository.findOneBy({ id });
    }


    async update(
        id: string,
        updateProductDto: UpdateProductDto
    ): Promise<Product> {
        console.log("updateProductDto", updateProductDto);
        await this.productRepository.update(id, updateProductDto);
        return this.productRepository.findOneBy({ id });
    }

    async remove(id: string): Promise<{ id: string }> {
        await this.productRepository.delete(id);
        return { id };
    }

}
