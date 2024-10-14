import { IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePropertyImageDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong hop le' })
  _id: string;

  @IsMongoId({ message: 'id property khong hop le' })
  @IsNotEmpty({ message: 'id property khong hop le' })
  propertyId: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  imageGroup?: string[];
}
