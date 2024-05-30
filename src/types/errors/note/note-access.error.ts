import { ForbiddenException } from '@nestjs/common';

export class NoteAccessError extends ForbiddenException {
  constructor(noteId: string) {
    super(`Access to note with ID ${noteId} is forbidden.`);
  }
}