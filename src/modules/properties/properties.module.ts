import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './schemas/property.schema';
import {
  Category,
  CategorySchema,
} from '../categories/schemas/category.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  AmenityGroup,
  AmenityGroupSchema,
} from '../amenity-group/schemas/amenity-group.schema';
import { Amenity, AmenitySchema } from '../amenities/schemas/amenity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
      { name: Category.name, schema: CategorySchema },
      { name: User.name, schema: UserSchema },
      { name: AmenityGroup.name, schema: AmenityGroupSchema },
      { name: Amenity.name, schema: AmenitySchema },
    ]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
