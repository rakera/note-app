import { NoteCreateOutputInterface } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';

export class NoteCreateOutput implements NoteCreateOutputInterface {

  @ApiProperty({ example: '9c2e0d27-be1d-497f-8739-1a4f946894cc' })
  public id: string;

  @ApiProperty({ example: 1 })
  public userId: number;

  @ApiProperty({ example: 'Note text' })
  public text: string;

  @ApiProperty({ example: '2024-06-02T14:55:00.000Z' })
  public createDate: Date;

  @ApiProperty({ example: '2024-06-02T14:55:00.000Z' })
  public updateDate: Date;

  @ApiProperty({ example: null })
  public shareId: string;
}