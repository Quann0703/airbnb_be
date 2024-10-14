import { ImageGroup } from '@/modules/image-groups/schemas/image-group.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PropertyImageDocument = HydratedDocument<PropertyImage>;

@Schema({ timestamps: true })
export class PropertyImage {
  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Property' })
  property: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImageGroup' }],
    default: [],
  })
  imageGroup: ImageGroup[];
}

export const PropertyImageSchema = SchemaFactory.createForClass(PropertyImage);
