import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AmenityGroupService } from './amenity-group.service';
import { CreateAmenityGroupDto } from './dto/create-amenity-group.dto';
import { UpdateAmenityGroupDto } from './dto/update-amenity-group.dto';

@Controller('amenity-group')
export class AmenityGroupController {
  constructor(private readonly amenityGroupService: AmenityGroupService) {}

  @Post()
  create(@Body() createAmenityGroupDto: CreateAmenityGroupDto) {
    return this.amenityGroupService.create(createAmenityGroupDto);
  }

  @Get()
  findAll() {
    return this.amenityGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amenityGroupService.findOne(+id);
  }

  @Patch()
  update(@Body() updateAmenityGroupDto: UpdateAmenityGroupDto) {
    return this.amenityGroupService.update(updateAmenityGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amenityGroupService.remove(id);
  }
}
