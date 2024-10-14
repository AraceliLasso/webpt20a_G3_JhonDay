import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { User } from 'src/users/users.entity';
import { Product } from 'src/products/products.entity';
import { CategoriesService } from 'src/category/categories.services';
import { HttpStatus } from '@nestjs/common';
import { Statusenum } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoriesService: CategoriesService, // Usar el servicio de categorías
  ) {}

  // Crear una cita
  async createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    try {
        const { user, categoryId, date } = createAppointmentDto;

        // Verificar si el usuario existe
        const userExist = await this.userRepository.findOne({ where: { id: user } });
        if (!userExist) {
            throw new NotFoundException(`User with ID ${user} not found`);
        }

        // Verificar si la categoría existe usando CategoriesService
        const categoryExist = await this.categoriesService.findOne(categoryId); 
        if (!categoryExist) {
            throw new NotFoundException(`Category with ID ${categoryId} not found`);
        }

        // Validar la fecha y hora de la cita
        const appointmentDate = new Date(date);
        const dayOfWeek = appointmentDate.getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
        const hour = appointmentDate.getHours();

        // Comprobar que la cita sea de lunes a viernes (1 a 5) y entre 9 AM (9) y 6 PM (18)
        if (dayOfWeek < 1 || dayOfWeek > 5 || hour < 9 || hour > 17) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Appointments can only be scheduled from Monday to Friday between 9 AM and 6 PM.',
            }, HttpStatus.BAD_REQUEST);
        }

        // Crear la cita
        const appointment = this.appointmentRepository.create({
            ...createAppointmentDto,
            user: userExist,
            category: categoryExist,
            status: Statusenum.PENDIENTE,
        });
        return await this.appointmentRepository.save(appointment);
    } catch (error) {
        // Manejar el error y devolver un mensaje apropiado
        throw new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
        }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

async findOne(id: string): Promise<Appointment> {
  const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['user', 'category'] });
  if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
  }
  return appointment;
}
  // Actualizar una cita
  async updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    Object.assign(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  // Eliminar una cita
  async removeAppointment(id: string): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }

  async findAppointmentsByUser (userId: string): Promise<Appointment[]> {
    const userExist = await this.userRepository.findOne({ where: { id: userId } });
    if (!userExist) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    return await this.appointmentRepository.find({
      where: { user: userExist },
      relations: ['user', 'category'],
    });
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({ relations: ['user', 'category'] });
  }
}
