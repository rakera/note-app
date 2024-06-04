import { LoginInterface } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';

export class LoginOutput implements LoginInterface {
  constructor(id: number, email: string, token: string) {
    this.id = id;
    this.email = email;
    this.token = token;
  }

  @ApiProperty({ example: 1 })
  public id: number;

  @ApiProperty({ example: 'user@email.com' })
  public email: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InJveWJhdHR5QGdtYWlsLmNvbSIsImlhdCI6MTcxNzQ0MjAyNiwiZXhwIjoxNzE3NTI4NDI2fQ.8JNorbYKyTQ3wUYhqwo6YnYdcba5TnyvwgPTRM7v17Y' })
  public token: string;
}
