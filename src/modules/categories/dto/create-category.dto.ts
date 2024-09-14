import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  icon: string;
}
