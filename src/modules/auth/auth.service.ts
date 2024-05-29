import {
  UserEmailExistsError,
  UserExistsError,
  UserWrongEmailOrPasswordError,
} from '@app/types/errors';
import { TokenService } from '@modules/token/token.service';
import { UserInput } from '@modules/user/input';
import { UserOutput } from '@modules/user/output/user.output';
import { UserEntity } from '@modules/user/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  async registerUser(user: UserInput): Promise<UserOutput> {
    const existUser: UserEntity = await this.userService.findUserByEmail(user.email);
    if (existUser) {
      throw new UserEmailExistsError(existUser.email);
    }

    return this.userService.createUser(user);
  }

  async loginUser(user: UserInput): Promise<UserOutput> {
    const existUser: UserEntity = await this.userService.findUserByEmail(user.email);
    if (!existUser) {
      throw new UserExistsError(user.email);
    }

    const validatePassword: boolean = await this.userService.validatePassword(user.password, existUser.password);
    if (!validatePassword) {
      throw new UserWrongEmailOrPasswordError();
    }

    return new UserOutput(existUser.id, existUser.email);
  }
}