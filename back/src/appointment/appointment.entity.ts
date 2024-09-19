import { User } from "src/users/users.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";


export enum Statusenum {
    PENDIENTE = 'pending',
    COMPLETADO = 'completed',
  }
  
@Entity({ name: "appointments" })
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("date")
  date: Date;

  @Column("time")
  time: string;

  @Column()
  description: string;

  @Column({ type: 'uuid' }) // Corregido a uuid
  userId: string; // apunta a otra tabla

  @Column({
    type: "enum",
    enum: Statusenum,
    default: Statusenum.PENDIENTE, // Establece un valor por defecto
  })
  status: Statusenum;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;
}

