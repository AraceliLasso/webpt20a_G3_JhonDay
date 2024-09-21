import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity({
    name: "products"
})
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100, nullable: false })
    name:string;

    @Column({ nullable: false })
    description:string;

    @Column({ type:"decimal", precision:10, scale:2, nullable: false })
    price:number;
    @Column({
        type: 'varchar',
        nullable: true,
        default: 'https://example.com/default-image.jpg'
    })
    imgUrl: string;
}