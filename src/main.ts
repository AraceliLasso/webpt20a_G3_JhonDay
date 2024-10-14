import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { auth } from 'express-openid-connect';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura CORS
  const frontendUrl = process.env.FRONTEND_URL; // Usa la URL del frontend aquí
  console.log({ frontendUrl: process.env.FRONTEND_URL })

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,  Authorization',
    maxAge: 3600,
  });

  //termina configuracion de cors

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle("JhonDay")
    .setDescription("Este proyecto es una gestión de turnos de un negocio de servicios técnicos")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);
    

  await app.listen(3010);
}

bootstrap();