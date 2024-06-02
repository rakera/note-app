import { UserCreateInterface } from '@app/types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserInput implements UserCreateInterface {

  @ApiProperty({ example: 'user@email.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  public password: string;
}