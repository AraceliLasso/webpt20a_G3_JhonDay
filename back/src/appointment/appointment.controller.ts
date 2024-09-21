import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentResponseDto } from './dto/response-appointment.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/products/products.service';
import { Product } from 'src/products/products.entity';

@ApiTags("appointments")
@Controller('appointments')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly productService: ProductService,
  ) {}

   // Endpoint para verificar si un producto existe
   @Get(':id/exists')
   @HttpCode(HttpStatus.OK) // Código de respuesta 200 OK
   async checkProductExists(@Param('id') itemId: string): Promise<{ exists: boolean }> {
       const exists = await this.productService.checkProductExists(itemId);
       return { exists }; // Devuelve un objeto con la propiedad exists
   }

   // Endpoint para obtener todos los productos
   @Get()
   @HttpCode(HttpStatus.OK) // Código de respuesta 200 OK
   async getProducts(): Promise<Product[]> {
       return await this.productService.getProductsService();
   }
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto> {
    const appointment = await this.appointmentService.createAppointment(createAppointmentDto);
    return new AppointmentResponseDto(appointment);
  }

  @Get()
  async findAll(): Promise<AppointmentResponseDto[]> {
    const appointments = await this.appointmentService.findAll();
    return appointments.map((appointment) => new AppointmentResponseDto(appointment));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AppointmentResponseDto> {
    const appointment = await this.appointmentService.findOne(id);
    return new AppointmentResponseDto(appointment);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentResponseDto> {
    const updatedAppointment = await this.appointmentService.updateAppointment(id, updateAppointmentDto);
    return new AppointmentResponseDto(updatedAppointment);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.appointmentService.removeAppointment(id);
  }
}