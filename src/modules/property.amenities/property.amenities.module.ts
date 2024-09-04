import { Module } from '@nestjs/common';
import { PropertyAmenitiesService } from './property.amenities.service';
import { PropertyAmenitiesController } from './property.amenities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PropertyAmenity,
  PropertyAmenitySchema,
} from './schemas/property.amenity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PropertyAmenity.name, schema: PropertyAmenitySchema },
    ]),
  ],
  controllers: [PropertyAmenitiesController],
  providers: [PropertyAmenitiesService],
})
export class PropertyAmenitiesModule {}
