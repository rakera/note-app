import {
  LoginOutput,
  UserInput,
  UserOutput,
} from '@app/types';
import {
  UserEmailExistsError,
  UserExistsError,
  UserWrongEmailOrPasswordError,
} from '@app/types/errors';
import { TokenService } from '@modules/token/token.service';
import { UserEntity } from '@modules/user/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {
  }

  async registerUser(user: UserInput): Promise<UserOutput> {
    const existUser: UserEntity = await this.userService.findUserByEmail(user.email);
    if (existUser) {
      throw new UserEmailExistsError(existUser.email);
    }

    return this.userService.createUser(user);
  }

  async loginUser(user: UserInput): Promise<LoginOutput> {
    const existUser: UserEntity = await this.userService.findUserByEmail(user.email);
    if (!existUser) {
      throw new UserExistsError(user.email);
    }

    const validatePassword: boolean = await this.userService.validatePassword(user.password, existUser.password);
    if (!validatePassword) {
      throw new UserWrongEmailOrPasswordError();
    }

    const token: string = await this.tokenService.generateJwtToken(existUser.id, existUser.email);

    return new LoginOutput(existUser.id, existUser.email, token);
  }
}