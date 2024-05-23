import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        logging: 'all',
        migrationsRun: false,
        migrationsTableName: '__note_migrations',
        synchronize: false,
        entities: [resolve(__dirname, '.src/**/*.entity.{ts,js}')],
        migrations: [resolve(__dirname, './src/migrations/*.{ts,js}')],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
