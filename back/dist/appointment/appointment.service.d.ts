import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { User } from 'src/users/users.entity';
export declare class AppointmentService {
    private readonly appointmentRepository;
    private readonly userRepository;
    constructor(appointmentRepository: Repository<Appointment>, userRepository: Repository<User>);
    createAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    updateAppointment(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    removeAppointment(id: string): Promise<void>;
}
