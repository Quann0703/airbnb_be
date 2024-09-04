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
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  totalPrice: number;

  @Prop()
  status: string; // Could be 'Confirmed', 'Pending', 'Cancelled'
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
