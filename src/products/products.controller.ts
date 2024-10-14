import { ApiOperation, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { ProductService } from "./products.service";
import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
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


    // @Post()
    // @ApiOperation({ summary: 'Crear un nuevo producto' })
    // @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductResponseDto })
    // @ApiResponse({ status: 500, description: 'Error inesperado al crear el producto' })
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles('admin')
    // @ApiSecurity('bearer')
    // async create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    //     try {
    //         const product = await this.productService.create(createProductDto);
    //         return product; // Aquí puedes devolver el producto creado
    //     } catch (error) {
    //         // Manejo del error, puedes registrar el error o realizar otras acciones
    //         console.error('Error al crear el producto:', error);
    //         throw new InternalServerErrorException('Error inesperado al crear el producto');
    //     }
    // }




    ///////////////////////Jhon

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ProductResponseDto })
    @ApiResponse({ status: 500, description: 'Error inesperado al crear el producto' })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiSecurity('bearer')
    async create(
        @Body() createProductDto: CreateProductDto
    ): Promise<ProductResponseDto> {
        try {
            return await this.productService.create(createProductDto);
        } catch (error) {
            console.error('Error al crear el producto:', error);
            throw new InternalServerErrorException('Error inesperado al crear el producto');
        }
    }





    @Post('search')
    @ApiOperation({ summary: 'Buscar productos por nombre, categoría, precio o descripción' })
    @ApiResponse({ status: 200, description: 'Productos encontrados', type: [Product] })
    @ApiResponse({ status: 404, description: 'No se encontraron productos' })
    async searchProducts(@Body() searchDto: SearchDto) {
        try {
            const products = await this.productService.searchProducts(searchDto);
            if (!products || products.length === 0) {
                throw new NotFoundException('No se encontraron productos');
            }
            return products;
        } catch (error) {
            console.error('Error al buscar productos:', error);
            throw new InternalServerErrorException('Error inesperado al buscar productos');
        }
    }
    
    @Put(":id")
    @ApiOperation({ summary: 'Actualizar un producto existente' })
    @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: ProductResponseDto })
    @ApiResponse({ status: 404, description: 'Producto no encontrado' })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiSecurity('bearer')
    async update(
        @Param("id") id: string,
        @Body() updateProductDto: UpdateProductDto
    ): Promise<ProductResponseDto> {
        try {
            const updatedProduct = await this.productService.update(id, updateProductDto);
            if (!updatedProduct) {
                throw new NotFoundException('Producto no encontrado');
            }
            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw new InternalServerErrorException('Error inesperado al actualizar el producto');
        }
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
