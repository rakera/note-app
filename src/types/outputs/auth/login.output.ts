import { LoginInterface } from '@app/types';

export class LoginOutput implements LoginInterface {
  constructor(id: number, email: string, token: string) {
    this.id = id;
    this.email = email;
    this.token = token;
  }

  public id: number;

  public email: string;

  public token: string;
}
