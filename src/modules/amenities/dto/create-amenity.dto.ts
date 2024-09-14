import { IsEmpty, IsOptional } from 'class-validator';

export class CreateAmenityDto {
  @IsEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  icon: string;
}
