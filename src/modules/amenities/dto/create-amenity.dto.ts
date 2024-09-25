import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAmenityDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  icon: string;

  @IsOptional()
  @IsMongoId()
  groupId?: string;
}
