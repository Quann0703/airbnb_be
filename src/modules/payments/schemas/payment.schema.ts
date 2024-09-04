import { Reservation } from '@/modules/reservations/schemas/reservation.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: mongoose.Schema.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Reservation.name })
  reservation: mongoose.Schema.Types.ObjectId;

  @Prop()
  amount: number;

  @Prop()
  paymentMethod: string; // Could be 'Credit Card', 'Paypal', etc.

  @Prop()
  status: string; // Could be 'Completed', 'Pending', 'Failed'
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
