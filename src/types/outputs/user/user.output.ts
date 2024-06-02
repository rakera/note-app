import { UserOutputInterface } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';

export class UserOutput implements UserOutputInterface {
  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }

  @ApiProperty({ example: 1 })
  public id: number;

  @ApiProperty({ example: 'user@email.com' })
  public email: string;
}
