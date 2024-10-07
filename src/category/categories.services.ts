import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { Product } from "src/products/products.entity";

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createCategoryDto);
        return await this.categoryRepository.save(category);
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
    }
    //*Gestion de Search
    async findProductsByCategory(categoryId: string): Promise<Product[]> {
      const category = await this.categoryRepository.findOne({
        where: { id: categoryId },
        relations: ['products'],
      });
      if (!category) {
        throw new HttpException("Category not found", HttpStatus.NOT_FOUND);
      }
      return category.products; // Asegúrate de que esto devuelve un array de productos
    }
  }                                                                        
