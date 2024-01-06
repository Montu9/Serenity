import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import customValidationPipe from './utils/customValidationPipe';
import * as cookieParser from 'cookie-parser';
import { corsOptions } from './config/corsOptions';
import { swaggerOptions } from './config/swaggerOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors(corsOptions);

  app.useGlobalPipes(customValidationPipe);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
