import { Module } from '@nestjs/common';
import { ImageGroupsService } from './image-groups.service';
import { ImageGroupsController } from './image-groups.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageGroup, ImageGroupSchema } from './schemas/image-group.schema';
import {
  PropertyImage,
  PropertyImageSchema,
} from '../property.images/schemas/property.image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ImageGroup.name,
        schema: ImageGroupSchema,
      },
      {
        name: PropertyImage.name,
        schema: PropertyImageSchema,
      },
    ]),
  ],
  controllers: [ImageGroupsController],
  providers: [ImageGroupsService],
})
export class ImageGroupsModule {}
