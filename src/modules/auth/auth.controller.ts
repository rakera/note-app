import { AuthService } from '@modules/auth/auth.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserInput } from 'src/types/inputs/user';
import { UserOutput } from '@app/types/outputs/user/user.output';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserOutput,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async registerUser(@Body() user: UserInput): Promise<UserOutput> {
    return await this.authService.registerUser(user);
  }

  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserOutput,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Body() user: UserInput): Promise<UserOutput> {
    return this.authService.loginUser(user);
  }
}