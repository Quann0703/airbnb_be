import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
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
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';

@Module({
  imports: [
    UsersModule,
    ReviewModule,
    ReservationsModule,
    PropertiesModule,
    PropertyImagesModule,
    AmenitiesModule,
    PropertyAmenitiesModule,
    PaymentsModule,
    CategoriesModule,
    FavoritesModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
