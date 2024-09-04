import { PartialType } from '@nestjs/mapped-types';
import { CreateAmenityDto } from './create-amenity.dto';

export class UpdateAmenityDto extends PartialType(CreateAmenityDto) {}
