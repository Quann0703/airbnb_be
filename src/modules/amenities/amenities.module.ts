import { Module } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Amenity, AmenitySchema } from './schemas/amenity.schema';
import {
  AmenityGroup,
  AmenityGroupSchema,
} from '../amenity-group/schemas/amenity-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Amenity.name,
        schema: AmenitySchema,
      },
      {
        name: AmenityGroup.name,
        schema: AmenityGroupSchema,
      },
    ]),
  ],
  controllers: [AmenitiesController],
  providers: [AmenitiesService],
})
export class AmenitiesModule {}
