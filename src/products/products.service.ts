import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Between, Like, Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Category } from "src/category/category.entity";
import { SearchDto } from "./dto/search-product.dto";
import { ProductResponseDto } from "./dto/response-product.dto";
import { CategoriesService } from "src/category/categories.services";
import { CategoryResponseDto } from "src/category/dto/response-category.dto";
import Fuse from 'fuse.js';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>, // Repositorio para Product

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>, // Repositorio para Category

        private readonly categoriesService: CategoriesService, // Servicio para manejar categorías
    ) { }

    async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        const product = new Product();
        product.name = createProductDto.name;
        product.description = createProductDto.description;
        product.price = createProductDto.price;
        product.image = createProductDto.image;
        product.categoryId = createProductDto.categoryId; // Asegúrate de que esto esté bien manejado

        // Guarda el producto y obtiene la categoría para el DTO de respuesta
        const savedProduct = await this.productRepository.save(product);
        const category = await this.categoriesService.findOne(product.categoryId);

        // Ahora pasa la categoría como argumento
        return new ProductResponseDto(savedProduct, new CategoryResponseDto(category.id, category.name));
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

        let products: Product[] = [];

        try {
            if (categoryName) {
                const category = await this.categoryRepository.findOne({ where: { name: categoryName } });
                if (category) {
                    const categoryProducts = await this.productRepository.find({
                        where: { category: { id: category.id } },
                    });
                    products = [...products, ...categoryProducts]; // Agregar productos de la categoría
                }
            }

            if (productName) {
                const productResults = await this.productRepository.find({
                    where: { name: Like(`%${productName}%`) }, // Búsqueda difusa por nombre
                });
                products = [...products, ...productResults]; // Agregar productos encontrados
            }

            if (typeof price === 'number') {
                // Definir un rango de búsqueda alrededor del precio ingresado
                const priceLowerBound = price - 10; // Ajusta este valor según tus necesidades
                const priceUpperBound = price + 10;

                const priceResults = await this.productRepository.find({
                    where: {
                        price: Between(priceLowerBound, priceUpperBound), // Búsqueda por precio cercano
                    },
                });
                products = [...products, ...priceResults]; // Agregar productos encontrados
            }

            // Buscar productos por descripción
            if (description) {
                const descriptionResults = await this.productRepository.find({
                    where: { description: Like(`%${description}%`) }, // Búsqueda por descripción
                });
                products = [...products, ...descriptionResults]; // Agregar productos encontrados
            }

            // Eliminar duplicados si es necesario
            products = Array.from(new Set(products.map(product => product.id))) // Mapa por ID para eliminar duplicados
                .map(id => products.find(product => product.id === id));

            return products;
        } catch (error) {
            console.error('Error en la búsqueda de productos:', error);
            throw new InternalServerErrorException('Error inesperado al buscar productos');
        }
    }

}

