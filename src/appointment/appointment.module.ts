import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { User } from 'src/users/users.entity'; // Importar si lo necesitas en el servicio
import { Product } from 'src/products/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, User, Product]) // Asegúrate de importar este módulo
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  exports: [AppointmentService],
})
export class AppointmentModule {}