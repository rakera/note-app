import { NoteUpdateInterface } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NoteUpdateInput implements NoteUpdateInterface {

  @ApiProperty({ example: 'Note text' })
  @IsString()
  @IsNotEmpty()
  public text: string;
}