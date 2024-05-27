import {
  UserEmailExistsError,
  UserExistsError,
  UserWrongEmailOrPasswordError,
} from '@app/types/errors';
import { HashService } from '@modules/user/hash.service';
import { UserInput } from '@modules/user/input';
import { UserOutput } from '@modules/user/output/user.output';
import { UserEntity } from '@modules/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private hashService: HashService,
  ) {
  }

  async createUser(user: UserInput): Promise<UserOutput> {
    const existUser: UserEntity = await this.findUserByEmail(user.email);
    if (existUser) {
      throw new UserEmailExistsError(existUser.email);
    }

    const hashedPassword: string = await this.hashPassword(user.password);
    const newUser: UserEntity = this.userRepository.create({ email: user.email, password: hashedPassword });

    const savedUser: UserEntity = await this.userRepository.save(newUser);

    return new UserOutput(savedUser.id, savedUser.email);
  }

  async getUser(user: UserInput): Promise<UserOutput> {
    const existUser: UserEntity = await this.findUserByEmail(user.email);
    if (!existUser) {
      throw new UserExistsError(user.email);
    }

    const validatePassword = await this.validatePassword(user.password, existUser.password);
    if (!validatePassword) {
      throw new UserWrongEmailOrPasswordError();
    }

    return new UserOutput(existUser.id, existUser.email);
  }

  private async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  private async hashPassword(password: string): Promise<string> {
    return await this.hashService.hashPassword(password);
  }

  private async validatePassword(password: string, hashPassword: string): Promise<boolean> {
    return await this.hashService.comparePassword(password, hashPassword);
  }
}
