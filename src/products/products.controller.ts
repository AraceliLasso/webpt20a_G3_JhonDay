import { ApiOperation, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./products.service";
import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductResponseDto } from "./dto/response-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./products.entity";
import { CheckProductExistsResponse } from "./dto/check-product.dto";
import { SearchDto } from "./dto/search-product.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/roles.guard";
import { Roles } from "src/decorators/roles.decorator";

@ApiTags("Products")
@Controller("products")
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Productos obtenidos', type: [Product] })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', example: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de resultados por página', example: 5 })
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
            throw new NotFoundException("Producto no encontrado");
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
    @ApiResponse({ status: 500, description: 'Error inesperado al crear el producto' })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiSecurity('bearer')
    async createProduct(@Body() createProductDto: CreateProductDto) {
        try {
            const product = await this.productService.create(createProductDto);
            return new ProductResponseDto(product);
        } catch (error) {
            console.error("Error inesperado en createProduct:", error);
            throw new InternalServerErrorException('No se pudo crear el producto');
        }
    }
    @Post('search')
    @ApiOperation({ summary: 'Buscar productos por nombre o categoría' })
    @ApiResponse({ status: 200, description: 'Productos encontrados', type: [Product] })
    @ApiResponse({ status: 404, description: 'No se encontraron productos' })
    async searchProducts(@Body() searchDto: SearchDto) {
        return this.productService.searchProducts(searchDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto actualizado', type: ProductResponseDto })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiSecurity('bearer')
    async updateProduct(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateProduct: UpdateProductDto) {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException(`Producto con id ${id} no fue encontrado`)
        }
        const updatedProduct = await this.productService.update(
            id,
            updateProduct as UpdateProductDto
        );
        return updatedProduct;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un producto por ID' })
    @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiSecurity('bearer')
    async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
        const product = await this.productService.findOne(id);
        if (!product) {
            throw new NotFoundException(`Producto con id ${id} no fue encontrado`);
        }
        await this.productService.remove(id);
        return; // Devuelve vacío para el código de estado 204
    }
    
    
}
