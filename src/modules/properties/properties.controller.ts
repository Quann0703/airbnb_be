import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Public } from '@/decorator/customize';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get()
  @Public()
  findAll(@Query('category') category: string) {
    return this.propertiesService.findAll(category);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Patch()
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesService.update(updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }
}
