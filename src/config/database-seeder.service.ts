import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Product } from 'src/products/products.entity';
import { mockProducts } from 'src/mocks/product.mock';
import { mockCategories } from 'src/mocks/category.mock';
import mockUsers from 'src/mocks/user.mock';
import { User } from 'src/users/users.entity';

@Injectable()
export class DatabaseSeederService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
        //*verifica si ya existen usuarios
        const existingUsers= await this.userRepository.find();
        if(existingUsers.length ===0){
            await this.userRepository.save(mockUsers)
        }
    }
}
