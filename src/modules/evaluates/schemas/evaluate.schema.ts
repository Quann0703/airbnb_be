import { Property } from '@/modules/properties/schemas/property.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type EvaluateDocument = HydratedDocument<Evaluate>;
@Schema({ timestamps: true })
export class Evaluate {
  @Prop({ required: true, min: 1, max: 5 })
  cleanliness: number; // độ sách sẽ

  @Prop({ required: true, min: 1, max: 5 })
  location: number; //vị trí

  @Prop({ required: true, min: 1, max: 5 })
  accuracy: number; // độ chính xác

  @Prop({ required: true, min: 1, max: 5 })
  communication: number; // giao tiếp

  @Prop({ required: true, min: 1, max: 5 })
  value: number; //giá trị

  @Prop({ required: true, min: 1, max: 5 })
  checkIn: number; //nhận phòng

  @Prop({ type: mongoose.Schema.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Property.name })
  property: mongoose.Schema.Types.ObjectId;
}
export const EvaluateSchema = SchemaFactory.createForClass(Evaluate);
