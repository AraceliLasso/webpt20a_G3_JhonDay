import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSeederService } from './database-seeder.service';
import { Category } from '../category/entities/category.entity';
import { Product } from '../products/products.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, User])],
  providers: [DatabaseSeederService],
  exports: [DatabaseSeederService], // Exporta el servicio si lo necesitas en otros módulos
})
export class DatabaseSeederModule {}
