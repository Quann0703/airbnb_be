import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateFavoriteDto {
  @IsNotEmpty({ message: 'id của bảng sở thích không được để trống' })
  @IsMongoId({ message: 'id yêu thích phải là objectId hợp lệ' })
  id: string;
  @IsNotEmpty({ message: 'khách hàng không được để trống' })
  @IsMongoId({ message: 'khách hàng phải là ObjectId hợp lệ' })
  user: string;

  @IsNotEmpty({ message: 'căn hộ không được để trống' })
  @IsMongoId({ message: 'căn hộ phải là ObjectId hợp lệ' })
  propertyId: string;
}
