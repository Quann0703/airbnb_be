import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateImageGroupDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong hop le' })
  _id: string;

  @IsNotEmpty()
  imageSrc: string;

  @IsOptional()
  isFeatured: boolean;

  @IsOptional()
  @IsMongoId()
  propertyImageId?: string;
}
