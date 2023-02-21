import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger;

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Coincidences Dashboard')
    .setDescription('API para mostrar las coincidencias de los alumnos matriculados en las sedes municipales y la sede central.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5000);
  logger.log(`Server is running on: ${ await app.getUrl() }`)
}
bootstrap();
