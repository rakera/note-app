import { NoteOutputInterface } from '@app/types';

export class NoteOutput implements NoteOutputInterface {

  public id: string;

  public userId: number;

  public text: string;

  public createDate: Date;

  public updateDate: Date;
}