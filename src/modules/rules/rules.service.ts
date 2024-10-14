/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Rule } from './schemas/rule.schema';

import mongoose, { Model } from 'mongoose';
import { Property } from '../properties/schemas/property.schema';

@Injectable()
export class RulesService {
  constructor(
    @InjectModel(Rule.name)
    private ruleModel: Model<Rule>,
    @InjectModel(Property.name)
    private propertyModel: Model<Property>,
  ) {}
  async create(createRuleDto: CreateRuleDto) {
    const { title, description, icon, propertyId } = createRuleDto;
    if (propertyId) {
      const property = await this.propertyModel.findById({ _id: propertyId });
      if (!property) {
        throw new BadRequestException('không tồn tại căn hộ này');
      }
    }
    const rule = await this.ruleModel.create({
      title,
      description,
      icon,
      property: propertyId,
    });
    return {
      _id: rule._id,
    };
  }

  findAll() {
    return `This action returns all rules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rule`;
  }

  async update(updateRuleDto: UpdateRuleDto) {
    const { _id, title, description, propertyId } = updateRuleDto;
    if (propertyId) {
      const property = await this.propertyModel.findById({ _id: propertyId });
      if (!property) {
        throw new BadRequestException('không tồn tại căn hộ này');
      }
    }
    const updateRule = await this.ruleModel.findByIdAndUpdate(
      { _id },
      {
        title,
        description,
        property: propertyId,
      },
    );
    return {
      updateRule,
    };
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId) {
      await this.ruleModel.deleteOne({ _id: id });
    }
  }
}
