import { Injectable } from '@nestjs/common';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';
import { UpdatePropertyImageDto } from './dto/update-property-image.dto';

@Injectable()
export class PropertyImageService {
  create(createPropertyImageDto: CreatePropertyImageDto) {
    return 'This action adds a new propertyImage';
  }

  findAll() {
    return `This action returns all propertyImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyImage`;
  }

  update(id: number, updatePropertyImageDto: UpdatePropertyImageDto) {
    return `This action updates a #${id} propertyImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertyImage`;
  }
}
