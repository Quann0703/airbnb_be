import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'password không được để trống' })
  password: string;

  @IsOptional()
  name: string;
}

export class CreateAuthGoogleDto {
  @IsNotEmpty({ message: 'email không được để trống' })
  email: string;
  @IsOptional()
  name: string;
  @IsOptional()
  image: string;
}
