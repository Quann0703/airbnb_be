import { Amenity } from '@/modules/amenities/schemas/amenity.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AmenityDocument = HydratedDocument<AmenityGroup>;

@Schema({ timestamps: true })
export class AmenityGroup {
  @Prop()
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Amenity' }],
    default: [],
  })
  amenities: Amenity[];
}

export const AmenityGroupSchema = SchemaFactory.createForClass(AmenityGroup);
