import { ApiProperty } from "@nestjs/swagger";

export class CheckProductExistsResponse {
    @ApiProperty({
        description: "Indica si el producto existe o no",
        example: true, // o false, dependiendo de lo que quieras mostrar
    })
    exists: boolean;

    constructor(exists: boolean) {
        this.exists = exists;
    }
}
