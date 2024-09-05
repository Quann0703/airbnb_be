import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModule } from './modules/reviews/reviews.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { PropertyImagesModule } from './modules/property.images/property.images.module';
import { AmenitiesModule } from './modules/amenities/amenities.module';
import { PropertyAmenitiesModule } from './modules/property.amenities/property.amenities.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ReviewModule,
    ReservationsModule,
    PropertiesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    PropertyImagesModule,
    AmenitiesModule,
    PropertyAmenitiesModule,
    PaymentsModule,
    CategoriesModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
