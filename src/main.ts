import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from '@/config/env';
import { LoggingService } from '@/common/logger/logger.service';
import { AllExceptionsFilter } from '@/common/filters/';
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
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useLogger(logger);
  app.enableCors();

  await app.listen(port, async () => {
    console.log(`Server listening on PORT ${port}`);
  });
}
bootstrap();
