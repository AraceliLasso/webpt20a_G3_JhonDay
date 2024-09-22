import { User } from "src/users/users.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { v4 as uuid} from 'uuid';


@Entity({
    name: "appointments"
})

export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("date")
    date: Date

    @Column()
    time: string

    @Column()
    description: string

    @Column({ type: 'string' })
    userId: string// apunta a otra tabla

    @Column()
    status: Statusenum

    @ManyToOne(() => User, (user) => user.appointments) //indica en qué columna guarda la FK
    user: User
}

export enum Statusenum {
    PENDIENTE='pending',
    COMPLETADO='completed'
}