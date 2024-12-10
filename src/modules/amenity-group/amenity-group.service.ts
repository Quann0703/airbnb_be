import { BadRequestException, Injectable } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-unused-vars */

import { InjectModel } from '@nestjs/mongoose';
import { CreateAmenityGroupDto } from './dto/create-amenity-group.dto';
import { UpdateAmenityGroupDto } from './dto/update-amenity-group.dto';
import { AmenityGroup } from './schemas/amenity-group.schema';
import mongoose, { Model } from 'mongoose';
import { group } from 'console';

@Injectable()
export class AmenityGroupService {
  constructor(
    @InjectModel(AmenityGroup.name)
    private amenityGroupModel: Model<AmenityGroup>,
  ) {}
  async create(createAmenityGroupDto: CreateAmenityGroupDto) {
    const { name, amenities } = createAmenityGroupDto;
    const amenityGroup = await this.amenityGroupModel.create({
      name,
      amenities: amenities || [],
    });
    if (!amenityGroup) {
      throw new BadRequestException('tao khong thanh cong');
    }
    return {
      _id: amenityGroup._id,
    };
  }

  async findAll() {
    try {
      const amenityGroups = await this.amenityGroupModel
        .find()
        .populate('amenities');
      const basis = amenityGroups.filter((group) => group.name === 'Cơ bản');
      const lux = amenityGroups.filter((group) => group.name === 'Cao cấp');
      const featured = amenityGroups.filter(
        (group) => group.name === 'Nổi bật',
      );
      return { amenityGroups, basis, lux, featured };
    } catch (error) {
      console.error('Error fetching amenity groups:', error);
      throw new Error('Unable to fetch Amenity Groups');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} amenityGroup`;
  }

  async update(updateAmenityGroupDto: UpdateAmenityGroupDto) {
    return await this.amenityGroupModel.updateOne(
      {
        _id: updateAmenityGroupDto._id,
      },
      { ...updateAmenityGroupDto },
    );
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId) {
      return await this.amenityGroupModel.deleteOne({ _id });
    }
  }
}
