import { NoteCreateInterface } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NoteCreateInput implements NoteCreateInterface {

  @ApiProperty({ example: 'Note text' })
  @IsString()
  @IsNotEmpty()
  public text: string;
}