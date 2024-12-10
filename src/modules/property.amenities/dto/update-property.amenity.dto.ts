import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePropertyAmenityDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong hop le' })
  _id: string;
  @IsMongoId({ message: 'ma can ho khong hop le' })
  @IsNotEmpty({ message: 'ma can ho khong hop le' })
  propertyId: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  amenities?: string[];
}
