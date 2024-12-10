/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePropertyAmenityDto } from './dto/create-property.amenity.dto';
import { UpdatePropertyAmenityDto } from './dto/update-property.amenity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PropertyAmenity } from './schemas/property.amenity.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class PropertyAmenitiesService {
  constructor(
    @InjectModel(PropertyAmenity.name)
    private propertyAmenityModel: Model<PropertyAmenity>,
  ) {}
  async create(createPropertyAmenityDto: CreatePropertyAmenityDto) {
    const { propertyId, amenities } = createPropertyAmenityDto;
    const propertyAmenity = await this.propertyAmenityModel.create({
      property: propertyId,
      amenities: amenities || [],
    });
    if (!propertyAmenity) {
      throw new BadRequestException('tao khong thanh cong');
    }
    return {
      _id: propertyAmenity._id,
    };
  }

  findAll() {
    return `This action returns all propertyAmenities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertyAmenity`;
  }

  async update(updatePropertyAmenityDto: UpdatePropertyAmenityDto) {
    const { _id, amenities } = updatePropertyAmenityDto;

    const propertyAmenity = await this.propertyAmenityModel.findById(_id);
    if (!propertyAmenity) {
      throw new BadRequestException(
        'Không tìm thấy Property Amenity với ID đã cho',
      );
    }

    const updatedAmenities = [
      ...new Set([...propertyAmenity.amenities, ...amenities]),
    ];

    const updatedPropertyAmenity = await this.propertyAmenityModel.updateOne(
      { _id },
      { $set: { amenities: updatedAmenities } },
    );

    if (updatedPropertyAmenity.modifiedCount === 0) {
      throw new BadRequestException(
        'Cập nhật Property Amenity không thành công',
      );
    }

    return {
      _id,
      message: 'Cập nhật Property Amenity thành công',
      updatedAmenities,
    };
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId) {
      return await this.propertyAmenityModel.deleteOne({ _id: id });
    }
  }
  async addAmenity(propertyAmenityId: string, amenity: string) {
    const result = await this.propertyAmenityModel.updateOne(
      { _id: propertyAmenityId },
      { $addToSet: { amenities: amenity } },
    );

    if (result.modifiedCount === 0) {
      throw new BadRequestException(
        'Không thể thêm tiện nghi vào Property Amenity',
      );
    }

    return {
      message: 'Tiện nghi đã được thêm vào thành công',
    };
  }
  async removeAmenity(propertyAmenityId: string, amenity: string) {
    const result = await this.propertyAmenityModel.updateOne(
      { _id: propertyAmenityId },
      { $pull: { amenities: amenity } }, // $pull để xóa một tiện nghi khỏi mảng
    );

    if (result.modifiedCount === 0) {
      throw new BadRequestException(
        'Không thể xóa tiện nghi khỏi Property Amenity',
      );
    }

    return {
      message: 'Tiện nghi đã được xóa khỏi thành công',
    };
  }
}
