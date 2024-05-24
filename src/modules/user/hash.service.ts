import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltRounds: number = 10;

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
    return await compare(password, hashPassword);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.saltRounds);
  }
}
