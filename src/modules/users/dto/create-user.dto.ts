import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'email không được để trống' })
  @IsEmail({}, { message: 'email không đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'password không được để trống' })
  password: string;

  phone: string;
  address: string;
  image: string;
}

export class CodeAuthDto {
  @IsNotEmpty({ message: '_id khong duoc de trong' })
  _id: string;

  @IsNotEmpty({ message: 'code khong duoc de trong' })
  code: string;
}
export class ChangePasswordDto {
  @IsNotEmpty({ message: 'code khong duoc de trong' })
  code: string;
  @IsNotEmpty({ message: 'email khong duoc de trong' })
  email: string;
  @IsNotEmpty({ message: 'password khong duoc de trong' })
  password: string;
  @IsNotEmpty({ message: 'password khong duoc de trong' })
  confirmPassword: string;
}
