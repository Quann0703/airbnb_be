import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertyImageService } from './property-image.service';
import { CreatePropertyImageDto } from './dto/create-property-image.dto';
import { UpdatePropertyImageDto } from './dto/update-property-image.dto';

@Controller('property-image')
export class PropertyImageController {
  constructor(private readonly propertyImageService: PropertyImageService) {}

  @Post()
  create(@Body() createPropertyImageDto: CreatePropertyImageDto) {
    return this.propertyImageService.create(createPropertyImageDto);
  }

  @Get()
  findAll() {
    return this.propertyImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyImageDto: UpdatePropertyImageDto) {
    return this.propertyImageService.update(+id, updatePropertyImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyImageService.remove(+id);
  }
}
