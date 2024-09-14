import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAmenityDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong hop le' })
  _id: string;

  @IsOptional()
  description: string;

  @IsOptional()
  icon: string;
}
