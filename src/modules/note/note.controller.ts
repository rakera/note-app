import {
  NoteCreateOutput,
  NoteCreateInput,
} from '@app/types';
import { NoteService } from '@modules/note/note.service';
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {
  }

  @Post('create')
  async createNote(@Body() note: NoteCreateInput): Promise<NoteCreateOutput> {
    return this.noteService.createNote(note);
  }
}