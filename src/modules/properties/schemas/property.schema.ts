import { Category } from '@/modules/categories/schemas/category.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;
@Schema({ timestamps: true })
export class Property {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  zipcode: string;

  @Prop()
  pricePerNight: number;

  @Prop()
  maxGuests: number;

  @Prop()
  numBedrooms: number;

  @Prop()
  numBathrooms: number;

  @Prop({ type: mongoose.Schema.ObjectId, ref: User.name })
  host: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Category.name })
  category: mongoose.Schema.Types.ObjectId;
}
export const PropertySchema = SchemaFactory.createForClass(Property);
