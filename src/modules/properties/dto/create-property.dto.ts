import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
  @IsString({ message: 'Tiêu đề phải là chuỗi ký tự' })
  title: string;

  @IsNotEmpty({ message: 'Mô tả không được để trống' })
  @IsString({ message: 'Mô tả phải là chuỗi ký tự' })
  description: string;

  @IsNotEmpty({ message: 'tầm nhìn không được để trống' })
  @IsString({ message: 'tầm nhìn phải là chuỗi ký tự' })
  view: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @IsString({ message: 'Địa chỉ phải là chuỗi ký tự' })
  address: string;

  @IsNotEmpty({ message: 'Thành phố không được để trống' })
  @IsString({ message: 'Thành phố phải là chuỗi ký tự' })
  city: string;

  @IsOptional()
  @IsString({ message: 'Quốc gia phải là chuỗi ký tự' })
  country: string;

  @IsOptional()
  @IsString({ message: 'Mã bưu điện phải là chuỗi ký tự' })
  zipCode: string;

  @IsNotEmpty({ message: 'Giá mỗi đêm không được để trống' })
  // @IsNumber({}, { message: 'Giá mỗi đêm phải là số' })
  pricePerNight: number;

  @IsNotEmpty({ message: 'điểm đánh giá phòng' })
  rating: number;

  @IsNotEmpty({ message: 'Số lượng khách tối đa không được để trống' })
  // @IsNumber({}, { message: 'Số lượng khách tối đa phải là số' })
  maxGuests: number;

  @IsNotEmpty({ message: 'Số lượng phòng ngủ không được để trống' })
  // @IsNumber({}, { message: 'Số lượng phòng ngủ phải là số' })
  numBedrooms: number;

  @IsNotEmpty({ message: 'Số lượng phòng tắm không được để trống' })
  // @IsNumber({}, { message: 'Số lượng phòng tắm phải là số' })
  numBathrooms: number;

  @IsNotEmpty({ message: 'Chủ sở hữu không được để trống' })
  @IsMongoId({ message: 'Chủ sở hữu phải là ObjectId hợp lệ' })
  host: string;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
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
