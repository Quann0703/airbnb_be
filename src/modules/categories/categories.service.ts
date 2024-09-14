/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { name, description, icon } = createCategoryDto;

    const category = await this.categoryModel.create({
      name,
      description,
      icon,
    });

    return {
      _id: category._id,
    };
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.categoryModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const results = await this.categoryModel
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
    const categoryById = await this.categoryModel.findOne({ _id: _id });
    return {
      categoryById,
    };
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.updateOne(
      {
        _id: updateCategoryDto._id,
      },
      { ...updateCategoryDto },
    );
  }

  async remove(_id: number) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.categoryModel.deleteOne({ _id });
    } else {
      throw new BadRequestException('Id khong dung dinh dang');
    }
  }
}
