import { AmenityGroup } from '@/modules/amenity-group/schemas/amenity-group.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AmenityDocument = HydratedDocument<Amenity>;

@Schema({ timestamps: true })
export class Amenity {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;

  @Prop({ type: Types.ObjectId, ref: AmenityGroup.name })
  group: AmenityGroup;
}

export const AmenitySchema = SchemaFactory.createForClass(Amenity);
