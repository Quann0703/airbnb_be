import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRuleDto {
  @IsNotEmpty({
    message: 'trường title không được trống',
  })
  title: string;

  @IsNotEmpty({
    message: 'trường mô tả không được để trống',
  })
  description: string;

  @IsOptional()
  icon: string;

  @IsOptional()
  @IsMongoId({ message: 'không đúng định dạng mã căn hộ' })
  propertyId: string;
}
