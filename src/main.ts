import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { stringify } from 'yaml';
import { writeFile } from 'node:fs/promises';
import { config } from '@/config/env';
import { AppModule } from './app.module';

const { PORT } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  await writeFile('./doc/api-generated.yaml', stringify(document));

  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors();

  await app.listen(PORT, async () => {
    console.log(`Server listening on: { PORT: ${PORT} }`);
  });
}
bootstrap();
