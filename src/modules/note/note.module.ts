import { NoteController } from '@modules/note/note.controller';
import { NoteService } from '@modules/note/note.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
