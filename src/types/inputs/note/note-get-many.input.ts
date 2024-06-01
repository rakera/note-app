import { NoteGetManyInterface } from '@app/types';
import {
  SearchDirectionEnum,
  SearchSortEnum,
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
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1)
  @Max(50)
  public limit: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1)
  public offset: number;

  @IsString()
  @IsEnum(SearchSortEnum)
  public sort: SearchSortEnum;

  @IsString()
  @IsEnum(SearchDirectionEnum)
  public direction: SearchDirectionEnum;
}