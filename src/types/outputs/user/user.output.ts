import { UserOutputInterface } from '@app/types';

export class UserOutput implements UserOutputInterface {
  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }

  public id: number;

  public email: string;
}
