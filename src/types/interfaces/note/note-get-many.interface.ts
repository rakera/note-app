import {
  NoteSearchSortEnum,
  SearchDirectionEnum,
} from '@app/types/enums';

export interface NoteGetManyInterface {
  limit: number;
  page: number;
  sort: NoteSearchSortEnum;
  direction: SearchDirectionEnum;
}