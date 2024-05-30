import { NoteCreateInterface } from '@app/types';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NoteCreateInput implements NoteCreateInterface {

  @IsString()
  @IsNotEmpty()
  public text: string;
}