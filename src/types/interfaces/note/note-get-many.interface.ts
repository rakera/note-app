import {
  SearchDirectionEnum,
  SearchSortEnum,
} from '@app/types/enums';

export interface NoteGetManyInterface {
  limit: number;
  offset: number;
  sort: SearchSortEnum;
  direction: SearchDirectionEnum;
}