import {
  configModuleOptions,
  pinoLoggerConfig,
} from '@app/config';
import { typeormModuleOptions } from '@app/config/typeorm-module-options.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TokenModule } from '@modules/token/token.module';
import { NoteModule } from '@modules/note/note.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(pinoLoggerConfig),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeormModuleOptions),
    UserModule,
    AuthModule,
    TokenModule,
    NoteModule,
  ],
})
export class AppModule {
}
