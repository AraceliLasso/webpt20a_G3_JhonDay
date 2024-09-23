import { Appointment } from "src/appointment/appointment.entity";
export declare class User {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    phone: number;
    address: string;
    city: string;
    admin: boolean;
    appointments: Appointment[];
}
