import { NoteCreateInterface } from '@app/types';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class NoteCreateInput implements NoteCreateInterface {

  @IsString()
  @IsNotEmpty()
  public text: string;
}