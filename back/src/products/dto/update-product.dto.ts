import { ApiProperty } from "@nestjs/swagger";


export class UpdateProductDto{
    @ApiProperty({
        type: String,
        description: "The new name of the product",
        required: false,
      })
      name: string;
    
      @ApiProperty({
        type: String,
        description: "The new description of the product",
        required: false,
      })
      description: string;
    
      @ApiProperty({
        type: Number,
        description: "The new price of the product",
        required: false,
      })
      price: number;
    
    
      @ApiProperty({
        type: String,
        description: "The new image URL of the product",
        required: false,
      })
      imgUrl: string;
}