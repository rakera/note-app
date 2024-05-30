import { NoteCreateInterface } from '@app/types';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class NoteCreateInput implements NoteCreateInterface {

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  public userId: number;

  @IsString()
  @IsNotEmpty()
  public text: string;
}