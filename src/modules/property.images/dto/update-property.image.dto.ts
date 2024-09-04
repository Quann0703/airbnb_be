import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyImageDto } from './create-property.image.dto';

export class UpdatePropertyImageDto extends PartialType(CreatePropertyImageDto) {}
