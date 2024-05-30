import { NotesController } from '@modules/notes/notes.controller';
import { NotesService } from '@modules/notes/notes.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
