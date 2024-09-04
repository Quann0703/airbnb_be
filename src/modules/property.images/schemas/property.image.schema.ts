import { Property } from '@/modules/properties/schemas/property.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PropertyImageDocument = HydratedDocument<PropertyImage>;

@Schema({ timestamps: true })
export class PropertyImage {
  @Prop({ type: mongoose.Schema.ObjectId, ref: Property.name })
  property: mongoose.Schema.Types.ObjectId;

  @Prop()
  imageSrc: string;

  @Prop({ default: false })
  isfeatured: boolean;
}

export const PropertyImageSchema = SchemaFactory.createForClass(PropertyImage);
