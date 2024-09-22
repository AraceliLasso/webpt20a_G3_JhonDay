import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "src/category/entities/category.entity";

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
    @ManyToOne(() => Category, category => category.products)
    category: Category;
}