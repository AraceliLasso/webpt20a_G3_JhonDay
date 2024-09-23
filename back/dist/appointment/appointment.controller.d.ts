import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentResponseDto } from './dto/response-appointment.dto';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentResponseDto>;
    findAll(): Promise<AppointmentResponseDto[]>;
    findOne(id: string): Promise<AppointmentResponseDto>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentResponseDto>;
    remove(id: string): Promise<void>;
}
