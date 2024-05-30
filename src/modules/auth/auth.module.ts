import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { JwtStrategy } from '@modules/auth/strategy';
import { TokenModule } from '@modules/token/token.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {
}
