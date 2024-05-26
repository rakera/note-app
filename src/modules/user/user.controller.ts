import { UserCreateInput } from '@modules/user/input';
import { UserOutput } from '@modules/user/output/user.output';
import { UserService } from '@modules/user/user.service';
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('register')
  async createUser (@Body() user: UserCreateInput): Promise<UserOutput> {
    return await this.userService.createUser(user);
  }
}
