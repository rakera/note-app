import { UserCreateInterface } from '@app/types';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserInput implements UserCreateInterface {

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}