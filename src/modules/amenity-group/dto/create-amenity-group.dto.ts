import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAmenityGroupDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  amenities?: string[];
}
