import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS для локального Electron app
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:8080'],
    credentials: true,
  });

  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle('Calendar API')
    .setDescription('API для локального календаря')
    .setVersion('1.0')
    .addTag('GetAllEvents', 'Получение всех событий')
    .addTag('GetEventById', 'Получение события по ID')
    .addTag('CreateEvent', 'Создание события')
    .addTag('UpdateEvent', 'Обновление события')
    .addTag('DeleteEvent', 'Удаление события')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
