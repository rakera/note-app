import { NoteGetOneInterface } from '@app/types';
import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class NoteGetOneInput implements NoteGetOneInterface {

  @IsUUID()
  @IsNotEmpty()
  public id: string;
}