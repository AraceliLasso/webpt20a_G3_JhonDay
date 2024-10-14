import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "src/products/products.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Appointment } from "src/appointment/appointment.entity";

@Entity({
    name: "categories"
})
export class Category {
    @ApiProperty({
        type: String,
        description: "Identificador único de la categoría",
        required: true,
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        type: String,
        description: "Nombre de la categoría",
        required: true,
    })
    @Column({ length: 100, nullable: false, unique: true })
    name: string;

    @ApiProperty({
        type: Number,
        description: "Precio de la categoría",
        required: true,
    })
    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number; //////////////jhon

    @OneToMany(() => Product, product => product.category)
    products: Product[];

    @OneToMany(() => Appointment, appointment => appointment.category)
    appointments: Appointment[];
}
