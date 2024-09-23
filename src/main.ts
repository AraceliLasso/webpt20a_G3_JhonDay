import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors'; // Asegúrate de instalar y importar cors

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura CORS
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'; // Usa la URL del frontend aquí

  app.enableCors({
    origin: frontendUrl, // Permite solicitudes solo desde esta URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permite el uso de cookies y encabezados de autenticación
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
