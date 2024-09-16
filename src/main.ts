import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

//*checkeo de bienestar del repositorio
//*intento de verificacion de apropiada creacion de repositorio con nest
