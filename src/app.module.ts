import { configModuleOptions } from '@app/config';
import { typeormModuleOptions } from '@app/config/database.source';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { TokenModule } from '@modules/token/token.module';
import { NotesModule } from '@modules/notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeormModuleOptions),
    UserModule,
    AuthModule,
    TokenModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
