import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Appointment } from "src/appointment/appointment.entity";
import { ProductService } from "./products.service";
import { ProductController } from "./products.controller";
import { Product } from "./products.entity";
import { CategoriesModule } from "src/category/category.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Appointment]), // Importa el repositorio de Product
        CategoriesModule, // Importa el módulo de categorías
    ],
    providers: [ProductService],
    controllers: [ProductController],
})
export class ProductsModule {}