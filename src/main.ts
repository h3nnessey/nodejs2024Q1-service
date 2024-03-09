import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { setupSwaggerFromYaml } from '@/config/swagger';
import { config } from '@/config/env';
import { AppModule } from './app.module';

const { PORT } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerMessage = await setupSwaggerFromYaml({
    app,
    docsRoute: 'doc',
    port: PORT,
    yamlPath: './doc/api.yaml',
  });

  await app.listen(PORT, async () => {
    console.log(`Server listening on: { PORT: ${PORT} }`);
    console.log(swaggerMessage);
  });
}
bootstrap();
