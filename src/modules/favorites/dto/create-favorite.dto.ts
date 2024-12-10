import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateFavoriteDto {
  @IsNotEmpty({ message: 'khách hàng không được để trống' })
  @IsMongoId({ message: 'khách hàng phải là ObjectId hợp lệ' })
  user: string;

  @IsNotEmpty({ message: 'căn hộ không được để trống' })
  @IsMongoId({ message: 'căn hộ phải là ObjectId hợp lệ' })
  property: string;
}
