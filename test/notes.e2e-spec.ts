import { typeormModuleOptions } from '@app/config';
import { UserEntity } from '@modules/user/user.entity';
import { INestApplication } from '@nestjs/common';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { AppModule } from '@app/app.module';
import typeormConfig from '@app/config/typeorm.config';

describe('Notes Module (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let noteId: string;
  let shareId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forRootAsync(typeormModuleOptions)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await typeormConfig.initialize();
    await app.init();

    token = await registerAndLogin(app);
  });

  afterAll(async () => {
    await typeormConfig.createQueryBuilder().delete().from(UserEntity).execute();
    await typeormConfig.destroy();
    await app.close();
  });

  it('should create a new note', async () => {
    const response = await request(app.getHttpServer())
      .post('/notes/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'New note' })
      .expect(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      userId: expect.any(String),
      text: 'New note',
      createDate: expect.any(String),
      updateDate: expect.any(String),
      shareId: null,
    });

    noteId = response.body.id;
  });

  it('should get note by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/notes/get/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toEqual({
      id: noteId,
      userId: expect.any(String),
      text: 'New note',
      createDate: expect.any(String),
      updateDate: expect.any(String),
      shareId: null,
    });
  });

  it('should update the note', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/notes/update/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Updated note' })
      .expect(200);

    expect(response.body).toEqual({
      id: noteId,
      userId: expect.any(String),
      text: 'Updated note',
      createDate: expect.any(String),
      updateDate: expect.any(String),
      shareId: null,
    });
  });

  it('should get all notes for the user', async () => {
    const response = await request(app.getHttpServer())
      .get('/notes/all')
      .set('Authorization', `Bearer ${token}`)
      .query({
        limit: 10,
        offset: 1,
        sort: 'create_date',
        direction: 'ASC',
      })
      .expect(200);

    expect(response.body).toEqual({
      'items': [{
        id: expect.any(String),
        userId: expect.any(String),
        text: 'Updated note',
        createDate: expect.any(String),
        updateDate: expect.any(String),
        shareId: null,
      }],
      'meta': {
        'totalItems': expect.anything(),
        'totalPages': expect.anything(),
        'currentPage': expect.any(String),
      },
    });
  });

  it('should share a note by id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/notes/share/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    shareId = response.body.shareId;

    expect(response.body).toEqual({
      id: noteId,
      userId: expect.any(String),
      text: 'Updated note',
      createDate: expect.any(String),
      updateDate: expect.any(String),
      shareId: expect.any(String),
    });
  });

  it('should get shared note by shareId', async () => {
    const sharedNoteResponse = await request(app.getHttpServer())
      .get(`/notes/shared/${shareId}`)
      .expect(200);

    expect(sharedNoteResponse.body).toEqual({
      id: noteId,
      userId: expect.any(String),
      text: 'Updated note',
      createDate: expect.any(String),
      updateDate: expect.any(String),
      shareId: expect.any(String),
    });
  });

  it('should delete the note', async () => {
    const deleteResponse = await request(app.getHttpServer())
      .delete(`/notes/delete/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(deleteResponse.body).toEqual({});
  });
});

async function registerAndLogin(app: INestApplication): Promise<string> {
  await request(app.getHttpServer())
    .post('/auth/register')
    .send({ email: 'test2@example.com', password: 'password' })
    .expect(201);

  const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send({ email: 'test2@example.com', password: 'password' })
    .expect(200);

  return loginResponse.body.token;
}