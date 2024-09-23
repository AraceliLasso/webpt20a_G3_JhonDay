import { User } from "src/users/users.entity";
export declare enum Statusenum {
    PENDIENTE = "pending",
    COMPLETADO = "completed"
}
export declare class Appointment {
    id: string;
    date: Date;
    time: string;
    description: string;
    userId: string;
    status: Statusenum;
    user: User;
}
