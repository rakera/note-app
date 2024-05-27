import { UnauthorizedException } from '@nestjs/common';

export class UserWrongEmailOrPasswordError extends UnauthorizedException {
  constructor() {
    super('Wrong email or password provided');
  }
}