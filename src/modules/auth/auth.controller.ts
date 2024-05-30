import { AuthService } from '@modules/auth/auth.service';
import { JwtGuard } from '@modules/auth/guards';
import { UserInput } from 'src/types/inputs/user';
import { UserOutput } from '@app/types/outputs/user/user.output';
import {
  Body,
  Controller,
  Post,
  UseGuards,
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

  @UseGuards(JwtGuard)
  @Post('test')
  test() {
    return true
  }
}