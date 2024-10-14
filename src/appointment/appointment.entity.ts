import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/users/users.entity";
import { Category } from "src/category/category.entity";
export enum Statusenum {
  PENDIENTE = 'Pendiente',
  COMPLETADO = 'Atendido',
  PAID = 'Pagado', /////////////////////////jhon
}

@Entity({
  name: "appointments",
})

export class Appointment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: Date;

  @Column()
  description: string;

  @Column({ default: 'Pendiente' })
  status: Statusenum;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Category, (category) => category.appointments)
  category: Category; // Relación con Category
}

