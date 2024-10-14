import { Module } from '@nestjs/common';
import { PropertyImagesService } from './property.images.service';
import { PropertyImagesController } from './property.images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PropertyImage,
  PropertyImageSchema,
} from './schemas/property.image.schema';
import {
  Property,
  PropertySchema,
} from '../properties/schemas/property.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertyImage.name, schema: PropertyImageSchema },
      { name: Property.name, schema: PropertySchema },
    ]),
  ],
  controllers: [PropertyImagesController],
  providers: [PropertyImagesService],
})
export class PropertyImagesModule {}
