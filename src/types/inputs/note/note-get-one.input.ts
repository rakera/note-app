import { NoteGetOneInterface } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class NoteGetOneInput implements NoteGetOneInterface {

  @ApiProperty({ example: '9c2e0d27-be1d-497f-8739-1a4f946894cc' })
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}