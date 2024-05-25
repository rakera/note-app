import { UserInterface } from '@app/types/interfaces';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name: 'users'})
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    unsigned: true,
  })
  public id: number;

  @Column({
    unique: true,
  })
  public login: string;

  @Column()
  public password: string;
}
