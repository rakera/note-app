import { PasswordHidingLogger } from '@app/common';
import databaseConfig from '@app/config/dbSource.config';
import path from 'path';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({ path: path.resolve('./.env') });
const dbConfig = databaseConfig();

export default new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  synchronize: false,
  entities: [path.resolve(__dirname + '/../modules/**/*.entity.{ts,js}')],
  migrations: [path.resolve(__dirname + '/../migrations/*.{ts,js}')],
  migrationsTableName: '__note_migrations',
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
});