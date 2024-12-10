import { Amenity } from '@/modules/amenities/schemas/amenity.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PropertyAmenityDocument = HydratedDocument<PropertyAmenity>;

@Schema({ timestamps: true })
export class PropertyAmenity {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Property' })
  property: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }],
    default: [],
  })
  amenities: Amenity[];
}

export const PropertyAmenitySchema =
  SchemaFactory.createForClass(PropertyAmenity);
