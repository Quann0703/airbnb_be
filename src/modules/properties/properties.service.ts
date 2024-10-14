/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './schemas/property.schema';
import mongoose, { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Category } from '../categories/schemas/category.schema';
import { AmenityGroup } from '../amenity-group/schemas/amenity-group.schema';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectModel(Property.name)
    private propertyModel: Model<Property>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
    @InjectModel(AmenityGroup.name)
    private amenityGroupModel: Model<AmenityGroup>,
  ) {}

  async create(createPropertyDto: CreatePropertyDto) {
    const {
      title,
      description,
      address,
      city,
      country,
      zipCode,
      pricePerNight,
      maxGuests,
      numBedrooms,
      numBathrooms,
      host,
      category,
      amenityGroupIds,
      images,
      view,
      rating,
    } = createPropertyDto;
    const user = await this.userModel.findById({ _id: host });
    if (!user) {
      throw new BadRequestException('người tạo không tồn tại');
    }
    const categoryFind = await this.categoryModel.findById({ _id: category });
    if (!categoryFind) {
      throw new BadRequestException('không tồn tai category');
    }
    if (amenityGroupIds && amenityGroupIds.length > 0) {
      const validAmenities = await this.amenityGroupModel.find({
        _id: { $in: amenityGroupIds },
      });
      if (validAmenities.length !== amenityGroupIds.length) {
        throw new BadRequestException('Một hoặc nhiều tiện ích không hợp lệ');
      }
    }
    const property = await this.propertyModel.create({
      title,
      description,
      address,
      city,
      country: country || 'Việt nam',
      zipCode: zipCode || 10000,
      pricePerNight: pricePerNight || 1,
      maxGuests: maxGuests || 1,
      numBathrooms: numBathrooms || 1,
      numBedrooms: numBedrooms || 1,
      category,
      amenityList: amenityGroupIds || [],
      host,
      images: images || '',
      view,
      rating,
    });

    return {
      _id: property._id,
    };
  }

  async findAll(category?: string) {
    let filter = {};

    if (category) {
      const categoryData = await this.categoryModel.findOne({ name: category });

      if (categoryData) {
        filter = { category: categoryData._id }; // Sử dụng categoryId để lọc
      }
    }

    console.log(filter);

    const properties = await this.propertyModel.find(filter).populate({
      path: 'images',
      populate: {
        path: 'imageGroup',
      },
    });

    return {
      properties,
    };
  }

  async findOne(_id: string) {
    const property = await this.propertyModel
      .findOne({ _id })
      .populate({
        path: 'images',
        populate: {
          path: 'imageGroup',
        },
      })
      .populate({
        path: 'host',
        select: '-password -role -codeId -isActive -codeExpired',
      })
      .populate({
        path: 'category',
      });
    return {
      property,
    };
  }

  async update(updatePropertyDto: UpdatePropertyDto) {
    const {
      _id,
      title,
      description,
      address,
      city,
      country,
      zipCode,
      pricePerNight,
      maxGuests,
      numBedrooms,
      numBathrooms,
      category,
      amenityGroupIds,
      images,
      view,
      rating,
    } = updatePropertyDto;

    const property = await this.propertyModel.findById(_id);
    if (!property) {
      throw new BadRequestException('Property không tồn tại');
    }
    if (category) {
      const categoryFind = await this.categoryModel.findById({ _id: category });
      if (!categoryFind) {
        throw new BadRequestException('không tồn tai category');
      }
    }

    if (amenityGroupIds && amenityGroupIds.length > 0) {
      const validAmenities = await this.amenityGroupModel.find({
        _id: { $in: amenityGroupIds },
      });
      if (validAmenities.length !== amenityGroupIds.length) {
        throw new BadRequestException('Một hoặc nhiều tiện ích không hợp lệ');
      }
      await this.propertyModel
        .findByIdAndUpdate(
          { _id },
          {
            $addToSet: { amenityList: { $each: amenityGroupIds } },
          },
        )
        .exec();
    }
    const updateProperty = await this.propertyModel.findByIdAndUpdate(
      { _id },
      {
        title,
        description,
        address,
        city,
        country,
        zipCode,
        pricePerNight,
        maxGuests,
        numBedrooms,
        numBathrooms,
        category,
        images,
        view,
        rating,
      },
    );
    return {
      updateProperty,
    };
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId) {
      const deleteProperty = await this.propertyModel.deleteOne({ _id });
      return { deleteProperty };
    }
  }
}
