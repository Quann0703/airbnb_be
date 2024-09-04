import { Module } from '@nestjs/common';
import { PropertyImageService } from './property-image.service';
import { PropertyImageController } from './property-image.controller';

@Module({
  controllers: [PropertyImageController],
  providers: [PropertyImageService],
})
export class PropertyImageModule {}
