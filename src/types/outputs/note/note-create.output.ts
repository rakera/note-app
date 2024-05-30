import { NoteCreateOutputInterface } from '@app/types';

export class NoteCreateOutput implements NoteCreateOutputInterface {
  constructor(id: string, userId: number, text: string, createDate: Date, updateDate: Date) {
    this.id = id;
    this.userId = userId;
    this.text = text;
    this.createDate = createDate;
    this.updateDate = updateDate;
  }

  public id: string;

  public userId: number;

  public text: string;

  public createDate: Date;

  public updateDate: Date;
}