import { DatabaseEnum } from '@app/types';

export interface DatabaseScopeInterface {
  type: DatabaseEnum;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize?: boolean;
  logging?: boolean;
  debug?: boolean;
}
