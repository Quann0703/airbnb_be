import { IsMongoId, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsMongoId({ message: 'người thuê phải là ObjectId hợp lệ' })
  userId: string;

  @IsOptional()
  @IsMongoId({ message: 'phòng phải là ObjectId hợp lệ' })
  propertyId: string;

  @IsOptional()
  night: number;
}
