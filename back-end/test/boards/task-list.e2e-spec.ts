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
import { TaskListEntity } from './../../src/task-management/entities/task-list.entity';

describe('TaskListsController (e2e)', () => {
  let app: NestExpressApplication;
  let boardsRepository: Repository<BoardEntity>;
  let taskListRepository: Repository<TaskListEntity>;

  let board: BoardEntity;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();

    configureApp(app);

    boardsRepository = app.get(getRepositoryToken(BoardEntity));
    taskListRepository = app.get(getRepositoryToken(TaskListEntity));

    await app.init();
  });

  beforeEach(async () => {
    clearAllTables(app);

    board = await boardsRepository.save(
      boardsRepository.create({
        name: faker.word.sample(),
      }),
    );
  });

  describe('GET /task-lists', () => {
    it('Should return task-lists list for specified board', async () => {
      const taskLists = Array.from({ length: 5 }).map(() =>
        taskListRepository.create({
          name: faker.word.sample(),
          boardId: board.id,
        }),
      );
      await taskListRepository.save(taskLists);

      const { body, status } = await request(app.getHttpServer()).get(
        `/task-lists?boardId=${board.id}`,
      );

      expect(status).toBe(200);
      expect(body).toHaveLength(5);
      expect(body).toEqual(
        taskLists.map((taskList) => expect.objectContaining(taskList)),
      );
    });
  });

  describe('POST /task-lists', () => {
    it('Should return 400 status when name too long', async () => {
      const name = faker.string.sample({ min: 51, max: 100 });

      const { body, status } = await request(app.getHttpServer())
        .post('/task-lists')
        .send({
          name,
          boardId: board.id,
        });

      expect(status).toBe(400);
      expect(body.message).toContain(
        'name must be shorter than or equal to 50 characters',
      );
    });

    it('Should return 201 status when taskList created', async () => {
      const name = faker.string.sample({ min: 5, max: 40 });

      const { body, status } = await request(app.getHttpServer())
        .post('/task-lists')
        .send({
          name,
          boardId: board.id,
        });

      expect(status).toBe(201);
      expect(body).toMatchObject({
        id: expect.any(Number),
        name,
      });
    });
  });
});
