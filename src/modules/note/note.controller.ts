import {
  NoteCreateOutput,
  NoteCreateInput,
  NoteOutput,
  NoteGetOneInput,
} from '@app/types';
import { GetUser } from '@app/types/decorators/user/get-user.decorator';
import { JwtGuard } from '@modules/auth/guards';
import { NoteService } from '@modules/note/note.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async createNote(
    @GetUser('id') userId: number,
    @Body() note: NoteCreateInput,
  ): Promise<NoteCreateOutput> {
    return await this.noteService.createNote(userId, note);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getNoteById(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
  ): Promise<NoteOutput> {
    return this.noteService.getNodeById(userId, noteId);
  }
}