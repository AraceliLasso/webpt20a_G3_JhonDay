import { IsBoolean } from "class-validator";
import { Appointment } from "src/appointment/appointment.entity";
import { Entity, Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { v4 as uuid} from 'uuid'

@Entity({
    name: 'users'
})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({length: 50, nullable: false})
    name: string;

    @Column({ length: 50, unique: true, nullable: false })
    email: string;

    @Column({nullable: true})
    age: number;
    
    @Column({ nullable: false })
    password: string;


    @Column({ type: 'int', nullable: true })
    phone: number;

    @Column({ nullable: true })
    address: string;

    @Column({ length: 50, nullable: true })
    city: string;

    @Column({default: false})
    admin: boolean


    @OneToMany(() => Appointment, appointment => appointment.user)
    appointments: Appointment[];

}