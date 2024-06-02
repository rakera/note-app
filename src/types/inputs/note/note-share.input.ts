import { NoteShareInterface } from '@app/types';
import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator';

export class NoteShareInput implements NoteShareInterface {

  @IsUUID()
  @IsNotEmpty()
  public shareId: string;
}