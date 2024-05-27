import { NotFoundException } from '@nestjs/common';

export class UserExistsError extends NotFoundException {
  constructor(email: string) {
    super(`User with email: ${email} does not exists`);
  }
}