import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';
import { corsOptions } from './config/corsOptions';
import { swaggerOptions } from './config/swaggerOptions';
import customValidationPipe from './utils/customValidationPipe';

const httpsOptions = {
  key: readFileSync(join(__dirname, '/../secrets/private-key.pem'), 'utf-8'),
  cert: readFileSync(
    join(__dirname, '/../secrets/public-certificate.pem'),
    'utf-8',
  ),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.enableCors(corsOptions);

  app.useGlobalPipes(customValidationPipe);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/', app, document);

  await app.listen(3001);
}
bootstrap();
