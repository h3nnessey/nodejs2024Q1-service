import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from '@/config/env';
import { LoggingService } from '@/common/logger/logger.service';
import { AppModule } from '@/app.module';

const { port } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LoggingService);
  const config = new DocumentBuilder()
    .setTitle('Home Library Service API')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      security: [{ bearer: [] }],
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useLogger(logger);
  app.enableCors();

  process.on('uncaughtException', (err, origin) => {
    logger.fatal(
      `[Uncaught Exception] Origin: ${origin} | Error: ${err.name} | Message: ${err.message} | Stack: ${JSON.stringify(err.stack)}`,
    );
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.fatal(
      `[Unhandled Rejection] Reason: ${JSON.stringify(reason)} | Promise: ${JSON.stringify(promise)}`,
    );
  });

  await app.listen(port, async () => {
    logger.log(`Server listening on PORT ${port}`);
  });
}
bootstrap();
