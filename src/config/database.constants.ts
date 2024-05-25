import { DatabaseScopeInterface } from '@app/types';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const getDatabaseOptions = (config: DatabaseScopeInterface): TypeOrmModuleOptions => {
  return {
    type: config.type,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    synchronize: config.synchronize,
    debug: config.debug,
    logging: config.logging,
    entities: [path.resolve(__dirname + '/../modules/*/*.entity{.ts,.js}')],
    migrations: [path.resolve(__dirname + '/../migrations/*{.ts,.js}')],
    migrationsTableName: '__note_migrations',
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
  };
};
