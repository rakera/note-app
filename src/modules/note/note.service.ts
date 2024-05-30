import {
  NoteCreateInput,
  NoteCreateOutput,
} from '@app/types';
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

  async createNote(note: NoteCreateInput): Promise<NoteCreateOutput> {

    const newNote: NoteEntity = this.noteRepository.create(note);
    const savedNote: NoteEntity = await this.noteRepository.save(newNote);
    return new NoteCreateOutput(
      savedNote.id,
      savedNote.userId,
      savedNote.text,
      savedNote.createDate,
      savedNote.updateDate,
    );
  }
}