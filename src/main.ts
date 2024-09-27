import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeederService } from './seeds/seeds-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura CORS
  const frontendUrl = process.env.FRONTEND_URL; // Usa la URL del frontend aquí
  console.log({frontendUrl: process.env.FRONTEND_URL})

  app.enableCors({
    origin: frontendUrl,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
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

  //*Configuracion de mockeo empieza
  // Ejecutar el seeder al iniciar la aplicación
  const databaseSeederService = app.get(SeederService);
  await databaseSeederService.seed(); // Llama al método seed
    //*Configuracion de mockeo termina
    

  await app.listen(3010);
}

bootstrap();