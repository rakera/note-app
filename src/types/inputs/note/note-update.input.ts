import { NoteUpdateInterface } from '@app/types';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NoteUpdateInput implements NoteUpdateInterface {

  @IsString()
  @IsNotEmpty()
  public text: string;
}