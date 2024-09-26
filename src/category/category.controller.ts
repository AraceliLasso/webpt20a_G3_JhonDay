import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.services";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiSecurity } from "@nestjs/swagger";
import { Category } from "./entities/category.entity";
import { AuthGuard } from "src/guard/auth.guard";
import { RolesGuard } from "src/guard/roles.guard";
import { Roles } from "src/decorators/roles.decorator";

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
    @Post()
    @ApiOperation({ summary: 'Crear una nueva categoría' })
    @ApiResponse({ status: 201, description: 'Categoría creada', type: Category })
    @UseGuards(AuthGuard, RolesGuard)
    @Roles('admin')
    @ApiSecurity('bearer')
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto);
    }


}