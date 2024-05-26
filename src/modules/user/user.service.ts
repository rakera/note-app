import { UserEmailExistsError } from '@app/types/errors';
import { HashService } from '@modules/user/hash.service';
import { UserCreateInput } from '@modules/user/input';
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

  async createUser(user: UserCreateInput): Promise<UserOutput> {
    const userByEmail: UserEntity = await this.userRepository.findOneBy({ email: user.email });
    if (userByEmail) {
      throw new UserEmailExistsError(user.email);
    }

    const hashedPassword: string = await this.hashService.hashPassword(user.password);
    const newUser: UserEntity = this.userRepository.create({ email: user.email, password: hashedPassword });

    const savedUser: UserEntity = await this.userRepository.save(newUser);

    return new UserOutput(savedUser.id, savedUser.email);
  }
}
