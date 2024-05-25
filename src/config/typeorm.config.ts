import * as process from 'process';
import path from 'path';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({ path: path.resolve('./.env') });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST.toString(),
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME.toString(),
  password: process.env.DB_PASSWORD.toString(),
  database: process.env.DB_NAME.toString(),
  logging: false,
  synchronize: false,
  entities: [path.resolve(__dirname + '/../modules/*/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname + '/../migrations/*{.ts,.js}')],
  migrationsTableName: '__note_migrations',
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
});