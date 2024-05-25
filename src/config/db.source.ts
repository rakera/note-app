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
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    logging: configService.get('DB_LOGGING'),
    synchronize: configService.get('DB_SYNCHRONIZE'),
    entities: [path.resolve(__dirname + '/../modules/*/*.entity{.ts,.js}')],
  }),
};