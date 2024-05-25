import { getDatabaseOptions } from '@app/config/database.constants';
import { DatabaseScopeInterface } from '@app/types';
import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeormModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
    const config: DatabaseScopeInterface = configService.get('database') as DatabaseScopeInterface;

    return getDatabaseOptions(config);
  },
};