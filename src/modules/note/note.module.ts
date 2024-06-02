import { NoteController } from '@modules/note/note.controller';
import { NoteEntity } from '@modules/note/note.entity';
import { NoteService } from '@modules/note/note.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
