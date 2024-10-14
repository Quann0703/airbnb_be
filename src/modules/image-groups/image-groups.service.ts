/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateImageGroupDto } from './dto/create-image-group.dto';
import { UpdateImageGroupDto } from './dto/update-image-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ImageGroup } from './schemas/image-group.schema';
import mongoose, { Model } from 'mongoose';
import { PropertyImage } from '../property.images/schemas/property.image.schema';

@Injectable()
export class ImageGroupsService {
  constructor(
    @InjectModel(ImageGroup.name) private imageGroupModel: Model<ImageGroup>,
    @InjectModel(PropertyImage.name)
    private propertyImageModel: Model<PropertyImage>,
  ) {}
  async create(createImageGroupDto: CreateImageGroupDto) {
    const { imageSrc, isFeatured, propertyImageId } = createImageGroupDto;
    const propertyImage = await this.propertyImageModel.findOne({
      _id: propertyImageId,
    });
    if (!propertyImage) {
      throw new BadRequestException('không có căn hộ ảnh nào ');
    }
    const imageGroup = await this.imageGroupModel.create({
      imageSrc,
      isFeatured: isFeatured || false,
      propertyImageId: propertyImageId,
    });
    if (propertyImageId) {
      await propertyImage.updateOne({ $push: { imageGroup: imageGroup._id } });
    }
    return {
      _id: imageGroup._id,
    };
  }

  findAll() {
    return `This action returns all imageGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageGroup`;
  }

  async update(updateImageGroupDto: UpdateImageGroupDto) {
    const { _id, imageSrc, isFeatured, propertyImageId } = updateImageGroupDto;

    const imageGroup = await this.imageGroupModel.findById(_id);
    if (!imageGroup) {
      throw new BadRequestException('khong ton tai anh');
    }

    const prevPropertyId = imageGroup.populated?.toString();
    const newPropertyId = propertyImageId;

    if (prevPropertyId && prevPropertyId !== newPropertyId) {
      if (prevPropertyId) {
        await this.propertyImageModel.findByIdAndUpdate(prevPropertyId, {
          $pull: { imageGroup: imageGroup._id },
        });
      }
      if (newPropertyId) {
        await this.propertyImageModel
          .findByIdAndUpdate(newPropertyId, {
            $addToSet: { imageGroup: imageGroup._id },
          })
          .exec();
      }
    }
    const updateImageGroup = await this.imageGroupModel.findByIdAndUpdate(
      _id,
      { imageSrc, isFeatured, propertyImageId: newPropertyId },
      { new: true },
    );
    if (!updateImageGroup) {
      throw new BadRequestException('cập nhập không thành công');
    }
    return {
      updateImageGroup,
    };
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      const imageGroup = await this.imageGroupModel.findById(id);
      if (!imageGroup) {
        throw new BadRequestException('khong ton tai anh');
      }
      const propertyImageId = imageGroup.propertyImageId?.toString();
      if (propertyImageId) {
        await this.propertyImageModel.findByIdAndUpdate(propertyImageId, {
          $pull: { imageGroup: imageGroup._id },
        });
      } else {
        throw new BadRequestException('id không đúng định dạng');
      }
    }
  }
}
