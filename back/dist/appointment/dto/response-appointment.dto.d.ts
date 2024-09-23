import { Statusenum } from '../appointment.entity';
import { Appointment } from '../appointment.entity';
export declare class AppointmentResponseDto {
    id: string;
    date: Date;
    time: string;
    description: string;
    userId: string;
    status: Statusenum;
    constructor(appointment: Appointment);
}
