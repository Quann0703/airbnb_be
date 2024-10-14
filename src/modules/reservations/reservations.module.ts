import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  Property,
  PropertySchema,
} from '../properties/schemas/property.schema';
import { UsersModule } from '../users/users.module';
import { PropertiesModule } from '../properties/properties.module';

@Module({
  imports: [
    UsersModule,
    PropertiesModule,
    MongooseModule.forFeature([
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
