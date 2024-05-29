import {
  UserInput,
  UserOutput,
} from '@app/types';
import {
  UserEmailExistsError,
  UserExistsError,
  UserWrongEmailOrPasswordError,
} from '@app/types/errors';
import { UserEntity } from '@modules/user/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
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

    console.log(this.configService.get('jwtSecret'));


    return new UserOutput(existUser.id, existUser.email);
  }
}