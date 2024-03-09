import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { parse } from 'yaml';
import { readFileSync } from 'node:fs';
import 'dotenv/config';

const PORT = parseInt(process.env.PORT, 10) || 4000;
const document = readFileSync('./doc/api.yaml', 'utf8');
const yaml = parse(document);
console.log(yaml);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log('Server started on port: ' + PORT));
}
bootstrap();
