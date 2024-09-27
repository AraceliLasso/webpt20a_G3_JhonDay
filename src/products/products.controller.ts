import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./products.service";
import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductResponseDto } from "./dto/response-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./products.entity";
import { CheckProductExistsResponse } from "./dto/check-product.dto";
import { SearchDto } from "./dto/search-product.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("Products")
@Controller("products")
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Productos obtenidos', type: [Product] })
    async getProducts(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.productService.getProducts(page, limit);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto obtenido', type: Product })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        return product;
    }
    

    @Get(':id/exists')
    @ApiOperation({ summary: 'Verificar si un producto existe' })
    @ApiResponse({ status: 200, description: 'Verificación de existencia', type: CheckProductExistsResponse })
    async checkProductExists(@Param('id') itemId: string): Promise<CheckProductExistsResponse> {
        const exists = await this.productService.checkProductExists(itemId);
        return { exists }; // Devuelve un objeto con la propiedad exists
    }


    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductResponseDto })
    async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
        return this.productService.create(createProductDto);
    }

    @Put(":id") // Cambiado de PATCH a PUT
    @ApiOperation({ summary: 'Actualizar un producto existente' })
    @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: ProductResponseDto })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async update(
        @Param("id") id: string,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<ProductResponseDto> {
        return this.productService.update(id, updateProductDto);
    }
    @Post('search')
    @ApiOperation({ summary: 'Buscar productos por nombre o categoría' })
    @ApiResponse({ status: 200, description: 'Productos encontrados', type: [Product] })
    @ApiResponse({ status: 404, description: 'No se encontraron productos' })
    async searchProducts(@Body() searchDto: SearchDto) {
        return this.productService.searchProducts(searchDto);
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un producto por ID' })
    @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        await this.productService.remove(id);
        return; // Devuelve vacío para el código de estado 204
    }
    
    
}
