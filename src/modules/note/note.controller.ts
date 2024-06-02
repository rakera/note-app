import {
  NoteCreateOutput,
  NoteCreateInput,
  NoteOutput,
  NoteGetOneInput,
  NoteUpdateInput,
  NoteGetManyInput,
  PaginateResponseInterface,
  GetUser,
  NoteShareInput,
} from '@app/types';
import { JwtGuard } from '@modules/auth/guards';
import { NoteService } from '@modules/note/note.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
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
  @Get('get/:id')
  async getNoteById(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
  ): Promise<NoteOutput> {
    return this.noteService.getNodeById(userId, noteId);
  }

  @UseGuards(JwtGuard)
  @Patch('update/:id')
  async updateNote(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
    @Body() note: NoteUpdateInput,
  ): Promise<NoteOutput> {
    return this.noteService.updateNote(userId, noteId, note);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async deleteNote(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
  ): Promise<boolean> {
    return this.noteService.deleteNote(userId, noteId);
  }

  @UseGuards(JwtGuard)
  @Get('all-notes')
  async getManyNotes(
    @GetUser('id') userId: number,
    @Query() params: NoteGetManyInput,
  ): Promise<PaginateResponseInterface<NoteOutput>> {
    return await this.noteService.getManyNotes(userId, params);
  }

  @UseGuards(JwtGuard)
  @Get('share/:id')
  async shareNoteById(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
  ): Promise<NoteOutput> {
    return await this.noteService.shareNoteById(userId, noteId);
  }

  @Get('shared/:shareId')
  async sharedNote(@Param() shareId: NoteShareInput): Promise<NoteOutput> {
    return this.noteService.getNoteByShareId(shareId);
  }
}