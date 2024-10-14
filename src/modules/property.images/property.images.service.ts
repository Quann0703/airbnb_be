/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePropertyImageDto } from './dto/create-property.image.dto';
import { UpdatePropertyImageDto } from './dto/update-property.image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyImage } from './schemas/property.image.schema';
import mongoose, { Model } from 'mongoose';
import { Property } from '../properties/schemas/property.schema';

@Injectable()
export class PropertyImagesService {
  constructor(
    @InjectModel(PropertyImage.name)
    private propertyImageModel: Model<PropertyImage>,
    @InjectModel(Property.name)
    private propertyModel: Model<Property>,
  ) {}
  async create(createPropertyImageDto: CreatePropertyImageDto) {
    const { propertyId, imageGroup } = createPropertyImageDto;
    const property = await this.propertyModel.findById({ _id: propertyId });
    if (!property) {
      throw new BadRequestException('không tồn tại căn hộ này');
    }
    const propertyImage = await this.propertyImageModel.create({
      property: propertyId,
      imageGroup: imageGroup || [],
    });
    return {
      _id: propertyImage._id,
    };
  }

  findAll() {
    return `This action returns all propertyImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyImage`;
  }

  async update(updatePropertyImageDto: UpdatePropertyImageDto) {
    const property = await this.propertyModel.findById({
      _id: updatePropertyImageDto.propertyId,
    });
    if (!property) {
      throw new BadRequestException('không tồn tại căn hộ này');
    }
    const propertyImage = await this.propertyImageModel.updateOne(
      {
        _id: updatePropertyImageDto._id,
      },
      {
        ...updatePropertyImageDto,
      },
    );
    return {
      propertyImage,
    };
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      await this.propertyImageModel.deleteOne({ _id: id });
    }
  }
}
