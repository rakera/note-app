import { NotFoundException } from '@nestjs/common';

export class NoteExistsError extends NotFoundException {
  constructor(noteId: string) {
    super(`Note with id: ${noteId} does not exists`);
  }
}