import { Module } from '@nestjs/common';
import { AmenityGroupService } from './amenity-group.service';
import { AmenityGroupController } from './amenity-group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AmenityGroup,
  AmenityGroupSchema,
} from './schemas/amenity-group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AmenityGroup.name,
        schema: AmenityGroupSchema,
      },
    ]),
  ],
  controllers: [AmenityGroupController],
  providers: [AmenityGroupService],
})
export class AmenityGroupModule {}
