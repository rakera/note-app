import { NoteGetManyInterface } from '@app/types';
import {
  NoteSearchSortEnum,
  SearchDirectionEnum,
} from '@app/types/enums';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class NoteGetManyInput implements NoteGetManyInterface {
  @Transform(({ value }) => +(value))
  @IsNumber()
  @Min(0)
  public page: number;

  @Transform(({ value }) => +(value))
  @IsNumber()
  @Min(0)
  @Max(50)
  public limit: number;

  @IsString()
  @IsEnum(NoteSearchSortEnum)
  public sort: NoteSearchSortEnum;

  @IsString()
  @IsEnum(SearchDirectionEnum)
  public direction: SearchDirectionEnum;
}