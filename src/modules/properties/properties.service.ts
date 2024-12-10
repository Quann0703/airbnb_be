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
import aqp from 'api-query-params';
import { Reservation } from '../reservations/schemas/reservation.schema';

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
    @InjectModel(Reservation.name)
    private reservationModal: Model<Reservation>,
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
      propertyAmenity,
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
      images: images || null,
      view,
      rating,
      propertyAmenity,
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
        filter = { category: categoryData._id };
      }
    }

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
      })
      .populate({
        path: 'propertyAmenity',
      });
    return {
      property,
    };
  }

  async searchProperty(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);

    // Xử lý phân trang
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    if (filter.userId) {
      filter.userId = filter.userId;
    }

    if (filter.guestCount) {
      filter.guestCount = filter.guestCount;
    }

    if (filter.roomCount) {
      filter.roomCount = filter.roomCount;
    }

    if (filter.bathRoomCount) {
      filter.bathRoomCount = filter.bathRoomCount;
    }

    if (filter.startDate || filter.endDate) {
      const startDate = filter.startDate ? new Date(filter.startDate) : null;
      const endDate = filter.endDate ? new Date(filter.endDate) : null;

      if (startDate && endDate) {
        const reservedPropertyIds = await this.reservationModal
          .find({
            $or: [
              { startDate: { $lte: endDate, $gte: startDate } },
              { endDate: { $lte: endDate, $gte: startDate } },
              { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
            ],
          })
          .distinct('propertyId');

        filter._id = { $nin: reservedPropertyIds };
      }
    }

    if (filter.city) {
      const rawCity = decodeURIComponent(filter.city);

      const normalizedCity = rawCity
        .replace(/,/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      filter.city = { $regex: normalizedCity, $options: 'i' };
    }

    if (filter.category) {
      filter.category = filter.category;
    }

    if (filter.minPrice || filter.maxPrice) {
      const minPrice = filter.minPrice ? parseFloat(filter.minPrice) : 0;
      const maxPrice = filter.maxPrice ? parseFloat(filter.maxPrice) : Infinity;
      filter.pricePerNight = { $gte: minPrice, $lte: maxPrice };
      delete filter.minPrice;
      delete filter.maxPrice;
    }

    const totalItems = await this.propertyModel.find(filter).countDocuments();
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const results = await this.propertyModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any)
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
      })
      .populate({
        path: 'propertyAmenity',
      });

    return { results, totalPages, totalItems };
  }

  async findHost(host: string) {
    const propertyHost = await this.propertyModel
      .find({ host: host })
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
      })
      .populate({
        path: 'propertyAmenity',
      });
    return {
      propertyHost,
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
      propertyAmenity,
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
        propertyAmenity,
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
