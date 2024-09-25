/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { UpdateAmenityDto } from './dto/update-amenity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Amenity } from './schemas/amenity.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import { AmenityGroup } from '../amenity-group/schemas/amenity-group.schema';

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectModel(Amenity.name)
    private amenityModel: Model<Amenity>,
    @InjectModel(AmenityGroup.name)
    private amenityGroupModel: Model<AmenityGroup>,
  ) {}
  async create(createAmenityDto: CreateAmenityDto) {
    const { name, description, icon, groupId } = createAmenityDto;

    const amenityGroupId = await this.amenityGroupModel.findOne({
      _id: groupId,
    });

    if (!amenityGroupId) {
      throw new BadRequestException('không có nhóm tiện ích nào');
    }

    const amenity = await this.amenityModel.create({
      name,
      description,
      icon,
      group: groupId,
    });
    if (!amenity) {
      throw new BadRequestException('tao khong thanh cong');
    }

    if (amenityGroupId) {
      await amenityGroupId.updateOne({ $push: { amenities: amenity._id } });
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
    const { _id, description, icon, groupId } = updateAmenityDto;

    // Tìm tiện ích dựa trên _id
    const amenity = await this.amenityModel.findById(_id);
    if (!amenity) {
      throw new BadRequestException('Tiện ích không tồn tại');
    }

    const prevGroupId = amenity.group?.toString(); // Chuyển ObjectId sang chuỗi để so sánh
    const newGroupId = groupId;

    // Nếu tiện ích đang thuộc group và group mới khác với group cũ
    if (prevGroupId && prevGroupId !== newGroupId) {
      // Xóa tiện ích khỏi group cũ (nếu có)
      if (prevGroupId) {
        await this.amenityGroupModel.findByIdAndUpdate(prevGroupId, {
          $pull: { amenities: amenity._id },
        });
      }

      // Thêm tiện ích vào group mới (nếu có)
      if (newGroupId) {
        await this.amenityGroupModel.findByIdAndUpdate(newGroupId, {
          $addToSet: { amenities: amenity._id },
        });
      }
    }

    const updatedAmenity = await this.amenityModel.findByIdAndUpdate(
      _id,
      { description, icon, group: newGroupId },
      { new: true }, // Trả về tài liệu đã được cập nhật
    );

    if (!updatedAmenity) {
      throw new BadRequestException('Cập nhật không thành công');
    }

    return {
      updatedAmenity,
    };
  }

  async remove(_id: number) {
    if (mongoose.isValidObjectId(_id)) {
      const amenity = await this.amenityModel.findById(_id);
      if (!amenity) {
        throw new BadRequestException('Tiện ích không tồn tại');
      }
      const groupId = amenity.group?.toString();
      if (groupId) {
        await this.amenityGroupModel.findByIdAndUpdate(groupId, {
          $pull: { amenities: amenity._id },
        });
      }
      return await this.amenityModel.deleteOne({ _id });
    } else {
      throw new BadRequestException('Id khong dung dinh dang');
    }
  }
}
