import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { User } from 'src/users/users.entity'; // Importar si lo necesitas en el servicio
import { Product } from 'src/products/products.entity';
import { ProductService } from 'src/products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Product])],
  providers: [AppointmentService, ProductService],
  controllers: [AppointmentController],
  exports: [AppointmentService],
})
export class AppointmentModule {}