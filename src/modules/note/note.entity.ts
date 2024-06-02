import { NoteInterface } from '@app/types';
import { UserEntity } from '@modules/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'notes' })
export class NoteEntity implements NoteInterface {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'user_id' })
  public userId: number;

  @Column()
  public text: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'create_date',
    precision: 0,
  })
  public createDate: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'update_date',
    precision: 0,
  })
  public updateDate: Date;

  @Column({
    name: 'share_id',
    type: 'uuid',
    unique: true,
    nullable: true,
  })
  public shareId: string;

  @ManyToOne(
    () => UserEntity,
    (user: UserEntity) => user.notes)
  @JoinColumn({
    name: 'user_id',
  })
  public user: UserEntity;
}