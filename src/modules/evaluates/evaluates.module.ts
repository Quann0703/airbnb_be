import { Module } from '@nestjs/common';
import { EvaluatesService } from './evaluates.service';
import { EvaluatesController } from './evaluates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evaluate, EvaluateSchema } from './schemas/evaluate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Evaluate.name,
        schema: EvaluateSchema,
      },
    ]),
  ],
  controllers: [EvaluatesController],
  providers: [EvaluatesService],
})
export class EvaluatesModule {}
