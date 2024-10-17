import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './Filter/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CustomResponseInterceptor } from './common/custom-response.Interceptor';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json({ limit: '50mb' }));

  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Tourism Website ')
    .setDescription('API for accessing the tourism website')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // app.useGlobalInterceptors(new CustomResponseInterceptor());

  app.use('/uploads', express.static('uploads'));

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(5001);
}
bootstrap();
