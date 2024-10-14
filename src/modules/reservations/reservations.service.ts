/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './schemas/reservation.schema';
import mongoose, { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Property } from '../properties/schemas/property.schema';
import { UsersService } from '../users/users.service';
import { PropertiesService } from '../properties/properties.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<Reservation>,
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Property.name)
    private propertyModel: Model<Property>,
    private userService: UsersService,
    private propertyService: PropertiesService,
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const {
      notes,
      propertyId,
      userId,
      email,
      phoneNumber,
      startDate,
      endDate,
      guestsCount,
      totalPrice,
      status,
      paymentMethod,
      paymentStatus,
    } = createReservationDto;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('không tồn tại người dùng');
    }
    const property = await this.propertyService.findOne(propertyId);
    if (!property) {
      throw new BadRequestException('không tồn tại căn hộ ');
    }
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestException('Ngày bắt đầu phải trước ngày kết thúc');
    }
    const reservation = await this.reservationModel.create({
      notes: notes,
      property: propertyId,
      user: userId,
      email: email,
      phoneNumber: phoneNumber,
      startDate,
      endDate,
      guestsCount: guestsCount || 1,
      totalPrice: totalPrice,
      status: status || 'Pending',
      paymentMethod: paymentMethod || 'Paypal',
      paymentStatus: paymentStatus || 'Paid',
    });
    return {
      _id: reservation._id,
    };
  }

  findAll() {
    return `This action returns all reservations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  async update(updateReservationDto: UpdateReservationDto) {
    const {
      _id,
      userId,
      propertyId,
      email,
      notes,
      paymentMethod,
      phoneNumber,
      paymentStatus,
      startDate,
      endDate,
      guestsCount,
      status,
    } = updateReservationDto;
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new BadRequestException('không tồn tại người dùng');
    }
    const property = await this.propertyService.findOne(propertyId);
    if (!property) {
      throw new BadRequestException('không tồn tại căn hộ ');
    }
    if (new Date(startDate) >= new Date(endDate)) {
      throw new BadRequestException('Ngày bắt đầu phải trước ngày kết thúc');
    }
    const reservation = await this.reservationModel.findByIdAndUpdate(
      { _id },
      {
        userId,
        propertyId,
        email,
        notes,
        paymentMethod,
        phoneNumber,
        paymentStatus,
        startDate,
        endDate,
        guestsCount,
        status,
      },
    );
    return {
      reservation,
    };
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId) {
      const deleteReservation = await this.reservationModel.deleteOne({
        _id: id,
      });
      return { deleteReservation };
    }
  }
}
