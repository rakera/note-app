import { UserInput } from '@modules/user/input';
import { UserOutput } from '@modules/user/output/user.output';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
  }

  async registerUser(user: UserInput): Promise<UserOutput> {
    return this.userService.createUser(user);
  }

  async loginUser(user: UserInput): Promise<UserOutput> {
    return this.userService.getUser(user);
  }
}