import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  propertyId: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' }) // Bạn có thể điều chỉnh mã quốc gia nếu cần
  phoneNumber?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'Ngày bắt đầu không hợp lệ' })
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: 'Ngày kết thúc không hợp lệ' })
  endDate: Date;

  @IsNotEmpty()
  guestsCount: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  paymentMethod?: string;

  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @IsOptional()
  @IsString()
  notes?: string; // Ghi chú thêm (tùy chọn)
}
