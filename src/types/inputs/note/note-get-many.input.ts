import { NoteGetManyInterface } from '@app/types';
import {
  SearchDirectionEnum,
  SearchSortEnum,
} from '@app/types/enums';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class NoteGetManyInput implements NoteGetManyInterface {

  @ApiProperty({ example: 10 })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1)
  @Max(50)
  public limit: number;

  @ApiProperty({ example: 1 })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1)
  public offset: number;

  @ApiProperty({
    enum: SearchSortEnum,
    example: SearchSortEnum.CREATE_DATE,
  })
  @IsString()
  @IsEnum(SearchSortEnum)
  public sort: SearchSortEnum;

  @ApiProperty({
    enum: SearchDirectionEnum,
    example: SearchDirectionEnum.ASC,
  })
  @IsString()
  @IsEnum(SearchDirectionEnum)
  public direction: SearchDirectionEnum;
}