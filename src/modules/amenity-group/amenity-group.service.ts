import { BadRequestException, Injectable } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-unused-vars */

import { InjectModel } from '@nestjs/mongoose';
import { CreateAmenityGroupDto } from './dto/create-amenity-group.dto';
import { UpdateAmenityGroupDto } from './dto/update-amenity-group.dto';
import { AmenityGroup } from './schemas/amenity-group.schema';
import mongoose, { Model } from 'mongoose';

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

  findAll() {
    return `This action returns all amenityGroup`;
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
