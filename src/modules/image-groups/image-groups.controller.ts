import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImageGroupsService } from './image-groups.service';
import { CreateImageGroupDto } from './dto/create-image-group.dto';
import { UpdateImageGroupDto } from './dto/update-image-group.dto';

@Controller('image-groups')
export class ImageGroupsController {
  constructor(private readonly imageGroupsService: ImageGroupsService) {}

  @Post()
  create(@Body() createImageGroupDto: CreateImageGroupDto) {
    return this.imageGroupsService.create(createImageGroupDto);
  }

  @Get()
  findAll() {
    return this.imageGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateImageGroupDto: UpdateImageGroupDto) {
    return this.imageGroupsService.update(updateImageGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageGroupsService.remove(id);
  }
}
