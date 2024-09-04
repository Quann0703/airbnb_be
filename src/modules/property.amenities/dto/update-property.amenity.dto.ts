import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyAmenityDto } from './create-property.amenity.dto';

export class UpdatePropertyAmenityDto extends PartialType(CreatePropertyAmenityDto) {}
