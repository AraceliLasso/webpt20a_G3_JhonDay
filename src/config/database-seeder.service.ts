import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Product } from 'src/products/products.entity';
import { mockProducts } from 'src/mocks/product.mock';
import { mockCategories } from 'src/mocks/category.mock';

@Injectable()
export class DatabaseSeederService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async seed() {
        // Verifica si ya existen categorías
        const existingCategories = await this.categoryRepository.find();
        if (existingCategories.length === 0) {
            await this.categoryRepository.save(mockCategories);
        }

        // Verifica si ya existen productos
        const existingProducts = await this.productRepository.find();
        if (existingProducts.length === 0) {
            await this.productRepository.save(mockProducts);
        }
    }
}
