/////////////////////////jhon
import { IsString, IsNumber } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number; // Asegúrate de que el tipo sea correcto
}

/////////////////////////jhon