import {
  NoteCreateInput,
  NoteCreateOutput,
  NoteGetOneInput,
  NoteOutput,
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

  async findNoteById(userId: number, noteId: NoteGetOneInput): Promise<NoteOutput> {

    const note: NoteEntity = await this.noteRepository.findOneBy({ id: noteId.id });

    if (!note) {
      throw new NoteExistsError(note.id);
    }

    if (note.userId !== userId) {
      throw new NoteAccessError(note.id);
    }

    return note;
  }
}