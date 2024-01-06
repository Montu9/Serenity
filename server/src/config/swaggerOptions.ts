import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Serenity')
  .setDescription('Dog shelter API for Serenity Management System')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
