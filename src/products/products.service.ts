import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { SearchDto } from "./dto/search-product.dto";
import { ProductResponseDto } from "./dto/response-product.dto";
import { CategoriesService } from "src/category/categories.services";
import { CategoryResponseDto } from "src/category/dto/response-category.dto";
import { InternalServerErrorException } from "@nestjs/common";


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>, // Repositorio para Product


        private readonly categoriesService: CategoriesService, // Servicio para manejar categorías
    ) { }

    // async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    //     const product = new Product();
    //     product.name = createProductDto.name;
    //     product.description = createProductDto.description;
    //     product.price = createProductDto.price;
    //     product.image = createProductDto.image;
    //     product.categoryId = createProductDto.categoryId; // Asegúrate de que esto esté bien manejado

    //     // Guarda el producto y obtiene la categoría para el DTO de respuesta
    //     const savedProduct = await this.productRepository.save(product);
    //     const category = await this.categoriesService.findOne(product.categoryId);

    //     // Ahora pasa la categoría como argumento
    //     return new ProductResponseDto(savedProduct, new CategoryResponseDto(category.id, category.name));
    // }





///////////////////Jhon

async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
  const category = await this.categoriesService.findOne(createProductDto.categoryId);
  if (!category) {
    throw new NotFoundException(`Categoría con ID ${createProductDto.categoryId} no encontrada`);
  }
  const product = this.productRepository.create({
    ...createProductDto,
    categoryId: createProductDto.categoryId,
  });

  try {
    const savedProduct = await this.productRepository.save(product);
    return new ProductResponseDto(savedProduct, {
      id: category.id,
      name: category.name,
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw new InternalServerErrorException('Error al guardar el producto');
  }
}




    async getProducts(page: number, limit: number) {
        return await this.productRepository.find({
            take: limit,
            skip: (page - 1) * limit,
        });
    }

    async findOne(id: string): Promise<ProductResponseDto> {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: ['category'], // Carga la relación de categoría
        });
        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        // Crea el DTO de categoría
        const categoryDto = new CategoryResponseDto(product.category.id, product.category.name);

        // Devuelve el DTO de producto con el DTO de categoría
        return new ProductResponseDto(product, categoryDto);
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
        const product = await this.productRepository.findOne({
            where: { id }, // Usar un objeto con la propiedad `where`
            relations: ['category'], // Cargar la relación de categoría
        });

        if (!product) {
            throw new NotFoundException(`Producto con ID ${id} no encontrado`);
        }

        // Actualiza los campos del producto
        if (updateProductDto.name) product.name = updateProductDto.name;
        if (updateProductDto.description) product.description = updateProductDto.description;
        if (updateProductDto.price) product.price = updateProductDto.price;
        if (updateProductDto.image) product.image = updateProductDto.image;

        const updatedProduct = await this.productRepository.save(product);
        const categoryDto = new CategoryResponseDto(updatedProduct.category.id, updatedProduct.category.name);

        return new ProductResponseDto(updatedProduct, categoryDto);
    }
    async remove(id: string): Promise<{ id: string }> {
        await this.productRepository.delete(id);
        return { id };
    }



    //*implementacion a pedido de Jhon forntend

    async checkProductExists(itemId: string): Promise<boolean> {
        const item = await this.productRepository.findOne({ where: { id: itemId } });
        return !!item; // Devuelve true si el item existe, false si no
    }

    async getProductsService(): Promise<Product[]> {
        return await this.productRepository.find(); // Devuelve todos los productos
    }

    //* implementacion para demo 1/2, logica busqueda de barra

    
      async searchProducts(searchDto: SearchDto): Promise<Product[]> {
        const { productName, categoryName, price, description } = searchDto;
    
        // Crear un array de promesas
        const queries = [];
    
        if (productName) {
          queries.push(
            this.productRepository.createQueryBuilder('product')
              .where('product.name ILIKE :name', { name: `%${productName}%` })
              .getMany(),
          );
        }
    
        if (categoryName) {
          queries.push(
            this.productRepository.createQueryBuilder('product')
              .innerJoinAndSelect('product.category', 'category')
              .where('category.name ILIKE :categoryName', { categoryName: `%${categoryName}%` })
              .getMany(),
          );
        }
    
        if (description) {
          queries.push(
            this.productRepository.createQueryBuilder('product')
              .where('product.description ILIKE :description', { description: `%${description}%` })
              .getMany(),
          );
        }
    
        if (typeof price === 'number') {
          const priceLowerBound = price - 10; // Ajusta este valor según tus necesidades
          const priceUpperBound = price + 10;
          
          queries.push(
            this.productRepository.createQueryBuilder('product')
              .where('product.price BETWEEN :lower AND :upper', { lower: priceLowerBound, upper: priceUpperBound })
              .getMany(),
          );
        }
    
        // Ejecutar todas las consultas y combinarlas
        const results = await Promise.all(queries);
        const uniqueProducts = Array.from(new Set(results.flat().map(product => product.id)))
          .map(id => results.flat().find(product => product.id === id));
    
        return uniqueProducts;
      }

      
    }
    



