import { Property } from '@/modules/properties/schemas/property.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type RuleDocument = HydratedDocument<Rule>;

@Schema({ timestamps: true })
export class Rule {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: Property.name })
  property: mongoose.Schema.Types.ObjectId;
}

export const RuleSchema = SchemaFactory.createForClass(Rule);
