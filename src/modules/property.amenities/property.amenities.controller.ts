import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyAmenitiesService } from './property.amenities.service';
import { CreatePropertyAmenityDto } from './dto/create-property.amenity.dto';
import { UpdatePropertyAmenityDto } from './dto/update-property.amenity.dto';

@Controller('property.amenities')
export class PropertyAmenitiesController {
  constructor(private readonly propertyAmenitiesService: PropertyAmenitiesService) {}

  @Post()
  create(@Body() createPropertyAmenityDto: CreatePropertyAmenityDto) {
    return this.propertyAmenitiesService.create(createPropertyAmenityDto);
  }

  @Get()
  findAll() {
    return this.propertyAmenitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyAmenitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyAmenityDto: UpdatePropertyAmenityDto) {
    return this.propertyAmenitiesService.update(+id, updatePropertyAmenityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyAmenitiesService.remove(+id);
  }
}
