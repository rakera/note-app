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
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Notes')
// @ApiBearerAuth()
@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {
  }

  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: NoteCreateOutput,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  async createNote(
    @GetUser('id') userId: number,
    @Body() note: NoteCreateInput,
  ): Promise<NoteCreateOutput> {
    return await this.noteService.createNote(userId, note);
  }

  @ApiOperation({ summary: 'Get note by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: NoteOutput,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('get/:id')
  async getNoteById(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
  ): Promise<NoteOutput> {
    return this.noteService.getNodeById(userId, noteId);
  }

  @ApiOperation({ summary: 'Update note by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: NoteOutput,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  async updateNote(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
    @Body() note: NoteUpdateInput,
  ): Promise<NoteOutput> {
    return this.noteService.updateNote(userId, noteId, note);
  }

  @ApiOperation({ summary: 'Delete note by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async deleteNote(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
  ): Promise<boolean> {
    return this.noteService.deleteNote(userId, noteId);
  }

  @ApiOperation({ summary: 'Get all notes' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: NoteOutput,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getManyNotes(
    @GetUser('id') userId: number,
    @Query() params: NoteGetManyInput,
  ): Promise<PaginateResponseInterface<NoteOutput>> {
    return await this.noteService.getManyNotes(userId, params);
  }

  @ApiOperation({ summary: 'Share note by id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: NoteOutput,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Get('share/:id')
  async shareNoteById(
    @GetUser('id') userId: number,
    @Param() noteId: NoteGetOneInput,
  ): Promise<NoteOutput> {
    return await this.noteService.shareNoteById(userId, noteId);
  }

  @ApiOperation({ summary: 'Shared note by shareId' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: NoteOutput,
  })
  @HttpCode(HttpStatus.OK)
  @Get('shared/:shareId')
  async sharedNote(@Param() shareId: NoteShareInput): Promise<NoteOutput> {
    return this.noteService.getNoteByShareId(shareId);
  }
}