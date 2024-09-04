import { Module } from '@nestjs/common';
import { PropertyImagesService } from './property.images.service';
import { PropertyImagesController } from './property.images.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PropertyImage,
  PropertyImageSchema,
} from './schemas/property.image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertyImage.name, schema: PropertyImageSchema },
    ]),
  ],
  controllers: [PropertyImagesController],
  providers: [PropertyImagesService],
})
export class PropertyImagesModule {}
