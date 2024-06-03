import {
  PasswordHidingLogger,
} from '@app/common';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import path from 'path';

export const typeormModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('host'),
    port: configService.get<number>('port'),
    database: configService.get<string>('database'),
    username: configService.get<string>('username'),
    password: configService.get<string>('password'),
    entities: [path.join(__dirname, '/../modules/**/*.entity{.ts,.js}')],
    logging: 'all',
  }),
};