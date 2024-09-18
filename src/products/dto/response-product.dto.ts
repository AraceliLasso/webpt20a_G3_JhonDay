import { ApiProperty } from "@nestjs/swagger";

export class ProductResponseDto{
    @ApiProperty({
        type: String,
        description: "The unique identifier of the product, asigned by the database",
        required: true,
    })
    id:string;

    @ApiProperty({
        type: String,
        description: "The name of the product",
        required: true,
    })
    name:string;

    @ApiProperty({
        type: String,
        description: "The description of the product",
        required: true,
    })
    description:string;

    @ApiProperty({
        type: Number,
        description: "The price of the product",
        required: true,
    })
    price:number;

    @ApiProperty({
        type: String,
        description: "The image URL of the product",
        required: false,
    })
    imgUrl:string;
}