import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeds-service';
import { Category } from '../category/entities/category.entity';
import { Product } from '../products/products.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product, User])],
  providers: [SeederService],
  exports: [SeederService], // Exporta el servicio si lo necesitas en otros módulos
})
export class SeederModule {}
