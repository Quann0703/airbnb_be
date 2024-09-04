import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertyModule } from './modules/property/property.module';
import { PropertyImageModule } from './modules/property-image/property-image.module';
import { ReservationModule } from './modules/reservation/reservation.module';
import { ReviewModule } from './modules/review/review.module';
import { AmenityModule } from './modules/amenity/amenity.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    PropertyModule,
    PropertyImageModule,
    ReservationModule,
    ReviewModule,
    AmenityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
