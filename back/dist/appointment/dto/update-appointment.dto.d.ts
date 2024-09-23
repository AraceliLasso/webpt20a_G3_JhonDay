import { Statusenum } from '../appointment.entity';
export declare class UpdateAppointmentDto {
    date?: Date;
    time?: string;
    description?: string;
    status?: Statusenum;
}
