import { NoteUpdateInterface } from '@app/types/interfaces/note/note-update.interface';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NoteUpdateInput implements NoteUpdateInterface {

  @IsString()
  @IsNotEmpty()
  public text: string;
}