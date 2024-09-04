import { Injectable } from '@nestjs/common';
import { CreatePropertyAmenityDto } from './dto/create-property.amenity.dto';
import { UpdatePropertyAmenityDto } from './dto/update-property.amenity.dto';

@Injectable()
export class PropertyAmenitiesService {
  create(createPropertyAmenityDto: CreatePropertyAmenityDto) {
    return 'This action adds a new propertyAmenity';
  }

  findAll() {
    return `This action returns all propertyAmenities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyAmenity`;
  }

  update(id: number, updatePropertyAmenityDto: UpdatePropertyAmenityDto) {
    return `This action updates a #${id} propertyAmenity`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyAmenity`;
  }
}
