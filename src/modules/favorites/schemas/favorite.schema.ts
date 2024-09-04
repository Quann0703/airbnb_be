import { Property } from '@/modules/properties/schemas/property.schema';
import { User } from '@/modules/users/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ type: mongoose.Schema.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Property.name })
  property: mongoose.Schema.Types.ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
