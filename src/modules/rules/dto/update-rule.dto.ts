import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRuleDto {
  @IsMongoId({ message: '_id khong hop le' })
  @IsNotEmpty({ message: '_id khong hop le' })
  _id: string;

  @IsNotEmpty({
    message: 'trường title không được trống',
  })
  title: string;

  @IsNotEmpty({
    message: 'trường mô tả không được để trống',
  })
  description: string;

  @IsOptional()
  @IsMongoId({ message: 'không đúng định dạng mã căn hộ' })
  propertyId: string;
}
