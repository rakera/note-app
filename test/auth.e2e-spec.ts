import { typeormModuleOptions } from '@app/config';
import typeormConfig from '@app/config/typeorm.config';
import { INestApplication } from '@nestjs/common';
import {
  Test,
  TestingModule,
} from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { AppModule } from '@app/app.module';

describe('Auth Module (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forRootAsync(typeormModuleOptions)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await typeormConfig.initialize();
    await app.init();
  });

  afterAll(async () => {
    await typeormConfig.destroy();
    await app.close();
  });

  it('should register a new user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(201);

    const id = response.body.id;
    expect(response.body).toEqual({
      id,
      email: 'test@example.com',
    });
  });

  it('should not register a user with an existing email', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'existing@example.com', password: 'password' })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'existing@example.com', password: 'password' })
      .expect(409);

    expect(response.body.message).toEqual('User with email: existing@example.com already exists');
  });

  it('should login the user', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200);

    expect(response.body).toEqual({
      id: expect.anything(),
      email: 'test@example.com',
      token:expect.any(String),
    });
  });
});
