import { Property } from '@/modules/properties/schemas/property.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ timestamps: true })
export class Reservation {
  @Prop({ type: mongoose.Schema.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Property.name })
  property: mongoose.Schema.Types.ObjectId;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: string; // Thêm số điện thoại liên hệ

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  guestsCount: number; // Thêm số lượng khách thuê

  @Prop()
  totalPrice: number;

  @Prop()
  status: string; // 'Confirmed', 'Pending', 'Cancelled'

  @Prop()
  paymentMethod: string; // 'Credit Card', 'Paypal', 'Cash'

  @Prop()
  paymentStatus: string; // 'Paid', 'Unpaid', 'Refunded'

  @Prop()
  notes: string; // Ghi chú cho đặt phòng
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
