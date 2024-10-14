import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateImageGroupDto {
  @IsNotEmpty()
  imageSrc: string;

  @IsOptional()
  isFeatured: boolean;

  @IsOptional()
  @IsMongoId()
  propertyImageId?: string;
}
