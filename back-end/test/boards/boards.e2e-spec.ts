import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './../../src/app.module';
import { BoardEntity } from './../../src/boards/entities/board.entity';
import { configureApp } from './../../src/configure-app';
import { clearAllTables } from '../helpers/utils';

describe('BoardsController (e2e)', () => {
  let app: NestExpressApplication;
  let boardsRepository: Repository<BoardEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    configureApp(app);
    boardsRepository = app.get(getRepositoryToken(BoardEntity));

    await app.init();
  });

  beforeEach(async () => {
    clearAllTables(app);
  });

  describe('GET /boards', () => {
    it('Should return boards list', async () => {
      const boards = Array.from({ length: 5 }).map(() =>
        boardsRepository.create({
          name: faker.word.sample(),
        }),
      );
      await boardsRepository.save(boards);

      const { body, status } = await request(app.getHttpServer()).get(
        '/boards',
      );

      expect(status).toBe(200);
      expect(body).toHaveLength(5);
      expect(body).toEqual(boards);
    });
  });

  describe('POST /boards', () => {
    it('Should return 400 status when name too long', async () => {
      const name = faker.string.sample({ min: 51, max: 100 });

      const { body, status } = await request(app.getHttpServer())
        .post('/boards')
        .send({
          name,
        });

      expect(status).toBe(400);
      expect(body.message).toContain(
        'name must be shorter than or equal to 50 characters',
      );
    });

    it('Should return 201 status when board created', async () => {
      const name = faker.string.sample({ min: 5, max: 40 });

      const { body, status } = await request(app.getHttpServer())
        .post('/boards')
        .send({
          name,
        });

      expect(status).toBe(201);
      expect(body).toMatchObject({
        id: expect.any(Number),
        name,
      });
    });
  });
});
