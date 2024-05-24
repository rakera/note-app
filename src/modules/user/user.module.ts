import { HashService } from '@app/modules/user/hash.service';
import { UserController } from '@app/modules/user/user.controller';
import { UserEntity } from '@app/modules/user/user.entity';
import { UserService } from '@app/modules/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, HashService],
  exports: [UserService],
})
export class UserModule {}
