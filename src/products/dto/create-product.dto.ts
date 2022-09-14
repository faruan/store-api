import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
