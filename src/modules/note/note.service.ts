import {
  NoteCreateInput,
  NoteCreateOutput,
  NoteGetManyInput,
  NoteGetOneInput,
  NoteOutput,
  NoteUpdateInput,
  PaginationResultsInterface,
} from '@app/types';
import {
  NoteAccessError,
  NoteExistsError,
} from '@app/types/errors';
import { NoteEntity } from '@modules/note/note.entity';
import { Injectable } from '@nestjs/common';
import {
  InjectEntityManager,
  InjectRepository,
} from '@nestjs/typeorm';
import {
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
  }

  async createNote(userId: number, note: NoteCreateInput): Promise<NoteCreateOutput> {
    const newNote: NoteEntity = this.noteRepository.create({ ...note, userId });
    return await this.entityManager.save(newNote);
  }

  async getNodeById(userId: number, noteId: NoteGetOneInput): Promise<NoteOutput> {
    return await this.findNoteById(userId, noteId);
  }

  async updateNote(userId: number, noteId: NoteGetOneInput, note: NoteUpdateInput): Promise<NoteOutput> {
    await this.getNodeById(userId, noteId);
    await this.entityManager.update(NoteEntity, noteId, note);
    return this.getNodeById(userId, noteId);
  }

  async deleteNote(userId: number, noteId: NoteGetOneInput): Promise<boolean> {
    await this.getNodeById(userId, noteId);
    const { affected } = await this.entityManager.delete(NoteEntity, noteId);
    return !!affected;
  }

  async getManyNotes(userId: number, params: NoteGetManyInput): Promise<PaginationResultsInterface<NoteOutput>> {
    console.log(params);
    const queryBuilder: SelectQueryBuilder<NoteEntity> = this.noteRepository.createQueryBuilder('note');
    queryBuilder.where('note.userId = :userId', { userId });
    return this.paginate(queryBuilder, params.limit, params.page);
  }

  async findNoteById(userId: number, noteId: NoteGetOneInput): Promise<NoteOutput> {
    const note: NoteEntity = await this.noteRepository.findOneBy({ id: noteId.id });

    if (!note) {
      throw new NoteExistsError(noteId.id);
    }

    if (note.userId !== userId) {
      throw new NoteAccessError(noteId.id);
    }

    return note;
  }

  async paginate<T extends object>(
    queryBuilder: SelectQueryBuilder<T>,
    limit: number,
    page: number,
  ): Promise<PaginationResultsInterface<T>> {
    const totalItems: number = await queryBuilder.getCount();
    const totalPages: number = Math.ceil(totalItems / limit);
    queryBuilder.skip((page - 1) * limit).take(limit);
    const items: T[] = await queryBuilder.getMany();
    return {
      items,
      meta: {
        totalItems,
        totalPages,
        currentPage: page,
      },
    };
  }
}