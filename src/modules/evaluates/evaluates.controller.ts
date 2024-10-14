import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EvaluatesService } from './evaluates.service';
import { CreateEvaluateDto } from './dto/create-evaluate.dto';
import { UpdateEvaluateDto } from './dto/update-evaluate.dto';

@Controller('evaluates')
export class EvaluatesController {
  constructor(private readonly evaluatesService: EvaluatesService) {}

  @Post()
  create(@Body() createEvaluateDto: CreateEvaluateDto) {
    return this.evaluatesService.create(createEvaluateDto);
  }

  @Get()
  findAll() {
    return this.evaluatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvaluateDto: UpdateEvaluateDto,
  ) {
    return this.evaluatesService.update(+id, updateEvaluateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluatesService.remove(+id);
  }
}
