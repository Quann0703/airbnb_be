import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import {
  Property,
  PropertySchema,
} from '../properties/schemas/property.schema';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, ConfigService],
})
export class PaymentsModule {}
