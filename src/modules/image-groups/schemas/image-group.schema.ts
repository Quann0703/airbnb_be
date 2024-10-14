import { PropertyImage } from '@/modules/property.images/schemas/property.image.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ImageGroupDocument = HydratedDocument<ImageGroup>;

@Schema({ timestamps: true })
export class ImageGroup {
  @Prop()
  imageSrc: string;

  @Prop({ default: false })
  isFeatured: boolean;

  @Prop({ type: Types.ObjectId, ref: PropertyImage.name })
  propertyImageId: PropertyImage;
}

export const ImageGroupSchema = SchemaFactory.createForClass(ImageGroup);
