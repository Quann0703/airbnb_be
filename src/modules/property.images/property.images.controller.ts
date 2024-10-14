import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropertyImagesService } from './property.images.service';
import { CreatePropertyImageDto } from './dto/create-property.image.dto';
import { UpdatePropertyImageDto } from './dto/update-property.image.dto';

@Controller('property.images')
export class PropertyImagesController {
  constructor(private readonly propertyImagesService: PropertyImagesService) {}

  @Post()
  create(@Body() createPropertyImageDto: CreatePropertyImageDto) {
    return this.propertyImagesService.create(createPropertyImageDto);
  }

  @Get()
  findAll() {
    return this.propertyImagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyImagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updatePropertyImageDto: UpdatePropertyImageDto) {
    return this.propertyImagesService.update(updatePropertyImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyImagesService.remove(id);
  }
}
