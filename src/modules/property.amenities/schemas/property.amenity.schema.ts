import { Amenity } from '@/modules/amenities/schemas/amenity.schema';
import { Property } from '@/modules/properties/schemas/property.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PropertyAmenityDocument = HydratedDocument<PropertyAmenity>;

@Schema({ timestamps: true })
export class PropertyAmenity {
  @Prop({ type: mongoose.Schema.ObjectId, ref: Property.name })
  property: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Amenity.name })
  amenity: mongoose.Schema.Types.ObjectId;
}

export const PropertyAmenitySchema =
  SchemaFactory.createForClass(PropertyAmenity);
