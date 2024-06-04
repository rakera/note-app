import {
  SearchDirectionEnum,
  SearchSortEnum,
} from '@app/types/enums';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
  let controller: NoteController;
  let noteService: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    noteService = module.get<NoteService>(NoteService);
  });

  it('should create a new note', async () => {
    const userId = 1;
    const noteData = { text: 'New note' };
    const expectedResponse = {
      id: '9c2e0d27-be1d-497f-8739-1a4f946894cc',
      userId, text: 'New note',
      createDate: new Date('2024-06-04'),
      updateDate: new Date('2024-06-04'),
      shareId: null,
    };

    jest.spyOn(noteService, 'createNote').mockResolvedValue(expectedResponse);

    const result = await controller.createNote(userId, noteData);

    expect(result).toEqual(expectedResponse);
  });

  it('should get note by id', async () => {
    const userId = 1;
    const noteId = '9c2e0d27-be1d-497f-8739-1a4f946894cc';
    const expectedResponse = {
      id: '9c2e0d27-be1d-497f-8739-1a4f946894cc',
      userId, text: 'New note',
      createDate: new Date('2024-06-04'),
      updateDate: new Date('2024-06-04'),
      shareId: null,
    };

    jest.spyOn(noteService, 'getNodeById').mockResolvedValue(expectedResponse);

    const result = await controller.getNoteById(userId, { id: noteId });

    expect(result).toEqual(expectedResponse);
  });

  it('should update the note', async () => {
    const userId = 1;
    const noteId = '9c2e0d27-be1d-497f-8739-1a4f946894cc';
    const noteData = { text: 'Updated note' };
    const expectedResponse = {
      id: '9c2e0d27-be1d-497f-8739-1a4f946894cc',
      userId,
      text: 'Updated note',
      createDate: new Date('2024-06-04'),
      updateDate: new Date('2024-06-04'),
      shareId: null,
    };

    jest.spyOn(noteService, 'updateNote').mockResolvedValue(expectedResponse);

    const result = await controller.updateNote(userId, { id: noteId }, noteData);

    expect(result).toEqual(expectedResponse);
  });

  it('should get all notes', async () => {
    const userId = 1;
    const query = {
      limit: 10,
      offset: 1,
      sort: SearchSortEnum.CREATE_DATE,
      direction: SearchDirectionEnum.ASC,
    };
    const expectedResponse = {
      items: [
        {
          id: '9c2e0d27-be1d-497f-8739-1a4f946894cc',
          userId,
          text: 'Updated note',
          createDate: new Date('2024-06-04'),
          updateDate: new Date('2024-06-04'),
          shareId: null,
        },
      ],
      meta: { totalItems: 1, totalPages: 1, currentPage: 1 },
    };

    jest.spyOn(noteService, 'getManyNotes').mockResolvedValue(expectedResponse);

    const result = await controller.getManyNotes(userId, query);

    expect(result).toEqual(expectedResponse);
  });

  it('should share a note by id', async () => {
    const userId = 1;
    const noteId = '9c2e0d27-be1d-497f-8739-1a4f946894cc';
    const expectedResponse = {
      id: '9c2e0d27-be1d-497f-8739-1a4f946894cc',
      userId,
      text: 'Updated note',
      createDate: new Date('2024-06-04'),
      updateDate: new Date('2024-06-04'),
      shareId: 'shareId',
    };

    jest.spyOn(noteService, 'shareNoteById').mockResolvedValue(expectedResponse);

    const result = await controller.shareNoteById(userId, { id: noteId });

    expect(result).toEqual(expectedResponse);
  });

  it('should get shared note by shareId', async () => {
    const shareId = 'shareId';
    const expectedResponse = {
      id: '9c2e0d27-be1d-497f-8739-1a4f946894cc',
      userId: 1,
      text: 'Updated note',
      createDate: new Date('2024-06-04'),
      updateDate: new Date('2024-06-04'),
      shareId,
    };

    jest.spyOn(noteService, 'getNoteByShareId').mockResolvedValue(expectedResponse);

    const result = await controller.sharedNote({ shareId });

    expect(result).toEqual(expectedResponse);
  });

  it('should delete the note', async () => {
    const userId = 1;
    const noteId = '9c2e0d27-be1d-497f-8739-1a4f946894cc';
    const expectedResponse = true;

    jest.spyOn(noteService, 'deleteNote').mockResolvedValue(expectedResponse);

    const result = await controller.deleteNote(userId, { id: noteId });

    expect(result).toEqual(expectedResponse);
  });

});
