import {
  configModuleOptions,
  loggerModuleConfig,
} from '@app/config';
import { typeormModuleOptions } from '@app/config/typeormModuleOptions.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TokenModule } from '@modules/token/token.module';
import { NoteModule } from '@modules/note/note.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(loggerModuleConfig),
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeormModuleOptions),
    UserModule,
    AuthModule,
    TokenModule,
    NoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
