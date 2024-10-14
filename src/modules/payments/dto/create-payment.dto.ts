import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsMongoId({ message: 'người thuê phải là ObjectId hợp lệ' })
  userId: string;

  @IsOptional()
  @IsMongoId({ message: 'phòng phải là ObjectId hợp lệ' })
  propertyId: string;

  @IsNotEmpty({ message: 'số đêm không được để trống' })
  night: number;
}
