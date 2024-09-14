/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Amenity } from './schemas/amenity.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectModel(Amenity.name)
    private amenityModel: Model<Amenity>,
  ) {}
  async create(createAmenityDto: CreateAmenityDto) {
    const { name, description, icon } = createAmenityDto;
    const amenity = await this.create({ name, description, icon });
    if (!amenity) {
      throw new BadRequestException('tao khong thanh cong');
    }
    return {
      _id: amenity._id,
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.amenityModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const results = await this.amenityModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any);
    return {
      results,
      totalPages,
    };
  }

  async findOne(_id: string) {
    const amenityById = await this.amenityModel.findOne({ _id: _id });
    if (!amenityById) {
      throw new BadRequestException('khong tim thay id');
    }
    return {
      amenityById,
    };
  }

  async update(updateAmenityDto: UpdateAmenityDto) {
    const updateAmenity = await this.amenityModel.updateOne(
      {
        _id: updateAmenityDto._id,
      },
      { ...updateAmenityDto },
    );
    if (!updateAmenity) {
      throw new BadRequestException('cap nhap khong thanh cong');
    }
    return {
      updateAmenity,
    };
  }

  async remove(_id: number) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.amenityModel.deleteOne({ _id });
    } else {
      throw new BadRequestException('Id khong dung dinh dang');
    }
  }
}
