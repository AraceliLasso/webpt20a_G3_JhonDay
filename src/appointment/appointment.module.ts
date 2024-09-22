import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { User } from 'src/users/users.entity'; // Importar si lo necesitas en el servicio

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  exports: [AppointmentService],
})
export class AppointmentModule {}
