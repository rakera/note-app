import { ConflictException } from '@nestjs/common';

export class UserEmailExistsError extends ConflictException {
  constructor(email: string) {
    super(`User with email: ${email} already exists`);
  }
}