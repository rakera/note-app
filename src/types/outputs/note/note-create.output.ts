import { NoteCreateOutputInterface } from '@app/types';

export class NoteCreateOutput implements NoteCreateOutputInterface {

  public id: string;

  public userId: number;

  public text: string;

  public createDate: Date;

  public updateDate: Date;
}