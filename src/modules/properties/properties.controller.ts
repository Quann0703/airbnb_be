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

  @Get('search')
  @Public()
  async searchProperties(
    @Query() query: string,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    // Chuyển current và pageSize sang kiểu number
    const currentPage = parseInt(current, 10) || 1;
    const pageLimit = parseInt(pageSize, 10) || 10;

    return this.propertiesService.searchProperty(query, currentPage, pageLimit);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Get('host/:id')
  @Public()
  findAllHost(@Param('id') hostId: string) {
    return this.propertiesService.findHost(hostId);
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
