import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const host = configService.get('APP_HOST');
  const port = configService.get('APP_PORT')

  await app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}

bootstrap();
