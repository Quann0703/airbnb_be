import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePropertyImageDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong hop le' })
  propertyId: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  imageGroup?: string[];
}
