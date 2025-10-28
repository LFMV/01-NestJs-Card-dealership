import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalPipes(
    new ValidationPipe({
        whitelist: true, //regresa la data ignorando campos que no son 
        forbidNonWhitelisted: true, // si no existe los campos no hace la consulta
    }),
  );
  
}
bootstrap();

/** 
 * nest g s cars --no-spec 
 * yarn add -D @types/uuid 
 * npm i class-validator class-transformer * 
 * nest g res brands --no-spec
 * yarn remove eslint-config-prettier
 * nest g res brands --no-spec
 * */
