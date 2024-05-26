import { UserInterface } from '@app/types/interfaces';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  public id: number;

  @Column({
    unique: true,
  })
  public email: string;

  @Column()
  @Exclude({
    toPlainOnly: true,
  })
  public password: string;
}
