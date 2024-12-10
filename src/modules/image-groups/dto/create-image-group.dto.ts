import { IsMongoId, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateImageGroupDto {
  @IsNotEmpty()
  @IsUrl({}, { each: true })
  imageSrc: string[];

  @IsOptional()
  isFeatured: boolean;

  @IsOptional()
  @IsMongoId()
  propertyImageId?: string;
}
