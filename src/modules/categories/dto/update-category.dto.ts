import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong duoc de trong' })
  _id: string;

  @IsOptional()
  description: string;

  @IsOptional()
  icon: string;
}
