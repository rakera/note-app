import {
  UserInput,
  UserOutput,
} from '@app/types';
import { HashService } from '@modules/user/hash.service';
import { UserEntity } from '@modules/user/user.entity';
import { Injectable } from '@nestjs/common';
import {
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import {
  EntityManager,
  Repository,
} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly hashService: HashService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
  }

  async createUser(user: UserInput): Promise<UserOutput> {
    const hashedPassword: string = await this.hashPassword(user.password);

    const newUser: UserEntity = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
    const savedUser: UserEntity = await this.entityManager.save(newUser);

    return new UserOutput(savedUser.id, savedUser.email);
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ email });
  }

  async hashPassword(password: string): Promise<string> {
    return await this.hashService.hashPassword(password);
  }

  async validatePassword(password: string, hashPassword: string): Promise<boolean> {
    return await this.hashService.comparePassword(password, hashPassword);
  }
}
