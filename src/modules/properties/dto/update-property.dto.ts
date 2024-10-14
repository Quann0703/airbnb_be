import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  IsNumber,
} from 'class-validator';
export class UpdatePropertyDto {
  @IsMongoId({ message: '_id khong hop le' })
  _id: string;

  @IsOptional()
  @IsString({ message: 'Tiêu đề phải là chuỗi ký tự' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description: string;

  @IsOptional()
  @IsString({ message: 'tầm nhìn phải là chuỗi ký tự' })
  view: string;

  @IsOptional()
  @IsString({ message: 'Địa chỉ phải là chuỗi ký tự' })
  address: string;

  @IsOptional()
  @IsString({ message: 'Thành phố phải là chuỗi ký tự' })
  city: string;

  @IsOptional()
  @IsString({ message: 'Quốc gia phải là chuỗi ký tự' })
  country: string;

  @IsOptional()
  @IsString({ message: 'Mã bưu điện phải là chuỗi ký tự' })
  zipCode: string;

  @IsOptional()
  @IsNumber({}, { message: 'Giá mỗi đêm phải là số' })
  pricePerNight: number;

  @IsOptional()
  @IsNumber({}, { message: 'điểm đánh giá phòng' })
  rating: number;

  @IsOptional()
  @IsNumber({}, { message: 'Số lượng khách tối đa phải là số' })
  maxGuests: number;

  @IsOptional()
  @IsNumber({}, { message: 'Số lượng phòng ngủ phải là số' })
  numBedrooms: number;

  @IsOptional()
  @IsNumber({}, { message: 'Số lượng phòng tắm phải là số' })
  numBathrooms: number;

  @IsOptional()
  @IsMongoId({ message: 'Danh mục phải là ObjectId hợp lệ' })
  category: string;

  @IsOptional()
  @IsMongoId({ message: 'Danh mục phải là ObjectId hợp lệ' })
  images: string;

  @IsArray({ message: 'Danh sách tiện nghi phải là một mảng' })
  @IsMongoId({ each: true, message: 'Mỗi tiện nghi phải là ObjectId hợp lệ' })
  @IsOptional()
  amenityGroupIds?: string[];
}
