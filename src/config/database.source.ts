import { getDatabaseOptions } from '@app/config/database.constants';
import {
  DatabaseEnum,
  DatabaseScopeInterface,
} from '@app/types';
import * as process from 'process';
import path from 'path';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: path.resolve('./.env') });

const config: DatabaseScopeInterface = {
  type: process.env.DB_TYPE as DatabaseEnum,
  host: process.env.DB_HOST.toString(),
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME.toString(),
  password: process.env.DB_PASSWORD.toString(),
  database: process.env.DB_NAME.toString(),
  logging: !!(parseInt(process.env.DB_LOGGING, 10)),
};

const options: DatabaseScopeInterface = getDatabaseOptions(config) as DatabaseScopeInterface;

export default new DataSource(options);