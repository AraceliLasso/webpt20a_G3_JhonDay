
import { Controller, Get, Post, Body, Param, UseGuards, Patch, HttpException, HttpStatus, Put, BadRequestException } from "@nestjs/common";
import { CategoriesService } from "./categories.services";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from "@nestjs/swagger";
import { Category } from "./category.entity";
import { CategoryResponseDto } from "./dto/response-category.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Product } from "src/products/products.entity";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }


    @Get()
    @ApiOperation({ summary: 'Listar todas las categorías' })
    @ApiResponse({ status: 200, description: 'Lista de categorías', type: [Category] })
    async findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una categoría por ID' })
    @ApiResponse({ status: 200, description: 'Categoría encontrada', type: Category })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.findOne(id);
    }

    @Get(':categoryId/products')
    @ApiOperation({ summary: 'Obtener productos por categoría' })
    @ApiResponse({ status: 200, description: 'Productos obtenidos', type: [Product] })
    @ApiResponse({ status: 404, description: 'Categoría no encontrada' })
    async findProductsByCategory(@Param('categoryId') categoryId: string) {
        return this.categoriesService.findProductsByCategory(categoryId);
    }

    @Post()
    @ApiOperation({ summary: 'Crear una nueva categoría' })
    @ApiResponse({ status: 201, description: 'Categoría creada', type: CategoryResponseDto })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiSecurity('bearer')
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryResponseDto> {
        const newCategory = await this.categoriesService.create(createCategoryDto);
        return new CategoryResponseDto(newCategory.id, newCategory.name);
    }
/////////////////////////jhon
@Put(':id')
async update(
  @Param('id') id: string, 
  @Body() updateCategoryDto: UpdateCategoryDto
): Promise<Category> {
  try {
    return await this.categoriesService.update(id, updateCategoryDto);
  } catch (error) {
    throw new BadRequestException('Error al actualizar la categoría: ' + error.message);
  }
}
}
/////////////////////////jhon
