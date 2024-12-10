import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePropertyAmenityDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong hop le' })
  propertyId: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  amenities?: string[];
}
