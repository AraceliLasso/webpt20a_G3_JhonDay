import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./products.service";
import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductResponseDto } from "./dto/response-product.dto";
import { IsUUID } from "class-validator";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./products.entity";


@ApiTags("Products")
@Controller("products")
export class ProductController{
    constructor(
        private readonly productService: ProductService,

    ){ }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Productos obtenidos', type: Product })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.productService.findAll(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtene producto con id' })
    @ApiResponse({ status: 200, description: 'Producto obtenido', type: Product })
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        const product = await this.productService.findOne(id);
        if (!IsUUID(4, { each: true })) {
            throw new HttpException(`Invalid UUID`, HttpStatus.BAD_REQUEST);
        }
        if (!product) {
            throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
        }
        return product;
    }

    @Post()
    @HttpCode(201)
    async createProduct(@Body() createProductDto: CreateProductDto) {
        try {
            const product = await this.productService.create(createProductDto);
            return new ProductResponseDto(product);
        } catch (error) {
            console.error("Unexpected error in createProduct:", error);
            throw new InternalServerErrorException('Product could not be created');
        }
    }
    


    @Put(':id')
    @HttpCode(200)
    async updateProduct(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProduct: UpdateProductDto) {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`)
        }
        const updatedProduct = await this.productService.update(
            id,
            updateProduct as UpdateProductDto
        );
        return updatedProduct;
    }

    @Delete(':id')
    @HttpCode(204)
    async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {

        const product = this.productService.findOne(id);

        if (!product) {
            throw new InternalServerErrorException("An unexpected error ocurred while deleting the product");
        }
        return this.productService.remove(id);
    }

}