import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { postgresDataSourceConfig } from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './category/category.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SharedModule } from './shared/shared.module';
import { SeedModule } from './seeds/seeds-module';
import { StripeModule } from './stripe/stripe.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MailModule } from './notifications/mail.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';


@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        load: [ postgresDataSourceConfig]
      }),
      TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          configService.get('postgres')
      }),
      UsersModule,
      ProductsModule,
      CategoriesModule,
      AppointmentModule,
      SeedModule,
      SharedModule,
      StripeModule,
      FileUploadModule,
      MailModule,
      AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
  exports: []
})

export class AppModule {}