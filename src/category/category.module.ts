import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesService } from "./categories.services";
import { CategoriesController } from "./category.controller";
import { Category } from "./entities/category.entity";
import { Product } from "src/products/products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesService],
    controllers: [CategoriesController],
    exports: [CategoriesService],
})
export class CategoriesModule {}