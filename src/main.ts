import 'reflect-metadata';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const host: string = configService.get<string>('APP_HOST');
  const port: number = configService.get<number>('APP_PORT');

  await app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}

bootstrap();
