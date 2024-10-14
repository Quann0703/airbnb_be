import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rule, RuleSchema } from './schemas/rule.schema';
import {
  Property,
  PropertySchema,
} from '../properties/schemas/property.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rule.name,
        schema: RuleSchema,
      },
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
  ],
  controllers: [RulesController],
  providers: [RulesService],
})
export class RulesModule {}
