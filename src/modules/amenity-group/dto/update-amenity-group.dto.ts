import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAmenityGroupDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong hop le' })
  _id: string;

  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  amenities?: string[];
}
