/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Favorite } from './schemas/favorite.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name)
    private favoriteModal: Model<Favorite>,
  ) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    const existingFavorite = await this.favoriteModal.findOne({
      property: createFavoriteDto.property,
      user: createFavoriteDto.user,
    });

    if (existingFavorite) {
      throw new Error('Favorite already exists.');
    }

    const newFavorite = await this.favoriteModal.create({
      ...createFavoriteDto,
    });

    return {
      _id: newFavorite._id,
    };
  }

  async findAll(user?: string) {
    console.log('User filter:', user);
    const filter = user ? { user } : {};

    const favorite = await this.favoriteModal
      .find(filter)
      .populate('user')
      .populate({
        path: 'property',
        populate: {
          path: 'images',
          populate: {
            path: 'imageGroup',
          },
        },
      });

    return favorite;
  }

  findOne(id: number) {
    return `This action returns a #${id} favorite`;
  }

  update(id: number, updateFavoriteDto: UpdateFavoriteDto) {
    return `This action updates a #${id} favorite`;
  }

  async remove(propertyId: string, userId: string) {
    if (
      !mongoose.isValidObjectId(propertyId) ||
      !mongoose.isValidObjectId(userId)
    ) {
      throw new Error('Invalid ID format for propertyId or userId');
    }

    const deleteResult = await this.favoriteModal.deleteOne({
      propertyId: propertyId,
      userId: userId,
    });

    if (deleteResult.deletedCount === 0) {
      throw new Error('No favorite found with the given propertyId and userId');
    }

    return { success: true, message: 'Favorite deleted successfully' };
  }
}
