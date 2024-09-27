import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeederService } from './database-seeder.service';
import { Category } from '../category/entities/category.entity';
import { Product } from '../products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product])],
  providers: [DatabaseSeederService],
  exports: [DatabaseSeederService], // Exporta el servicio si lo necesitas en otros módulos
})
export class DatabaseSeederModule {}
