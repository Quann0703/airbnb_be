import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId({ message: '_id khong howp le' })
  @IsNotEmpty({ message: 'id khong duoc de trong' })
  _id: string;

  @IsOptional()
  name: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  address: string;
  @IsOptional()
  image: string;
  @IsOptional()
  bio: string;
}
