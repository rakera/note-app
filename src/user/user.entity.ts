import { UserInterface } from '@app/user/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
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
