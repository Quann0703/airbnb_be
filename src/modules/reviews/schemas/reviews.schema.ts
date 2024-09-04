import { Property } from '@/modules/properties/schemas/property.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: mongoose.Schema.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Property.name })
  property: mongoose.Schema.Types.ObjectId;

  @Prop()
  rating: number; // 1 to 5 stars

  @Prop()
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
