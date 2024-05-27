import { AuthService } from '@modules/auth/auth.service';
import { UserInput } from '@modules/user/input';
import { UserOutput } from '@modules/user/output/user.output';
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  async registerUser(@Body() user: UserInput): Promise<UserOutput> {
    return await this.authService.registerUser(user);
  }

  @Post('login')
  async loginUser(@Body() user: UserInput): Promise<UserOutput> {
    return this.authService.loginUser(user);
  }
}