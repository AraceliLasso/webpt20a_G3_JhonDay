// appointment.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';
import { CategoriesModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, User, Product]), // Asegúrate de que estos estén correctamente configurados
    CategoriesModule, // Importa CategoriesModule aquí
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
