import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskListEntity } from '../entities/task-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from '../dto/create-task-list.dto';
import { PartialUpdateTaskListDto } from '../dto/partial-update-task-list.dto';
import { FetchTaskListsQueryDto } from '../dto/fetch-task-lists.query.dto';
import { BoardsService } from '../../boards/boards.service';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskListEntity)
    private taskListsRepository: Repository<TaskListEntity>,
    private boardsService: BoardsService,
  ) {}

  async create(payload: CreateTaskListDto): Promise<TaskListEntity> {
    await this.boardsService.existsOrFail(payload.boardId);
    const taskList = this.taskListsRepository.create(payload);

    return this.taskListsRepository.save(taskList);
  }

  findAll(query: FetchTaskListsQueryDto): Promise<TaskListEntity[]> {
    return this.taskListsRepository.find({
      relations: { tasks: true },
      where: { boardId: query.boardId },
    });
  }

  async findOneById(id: number): Promise<TaskListEntity> {
    const entity = await this.taskListsRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('task list not found');
    }

    return entity;
  }

  async existsOrFail(id: number): Promise<true> {
    const isExists = await this.taskListsRepository.existsBy({ id });

    if (!isExists) {
      throw new NotFoundException('task list not found');
    }

    return true;
  }

  async partialUpdate(
    id: number,
    payload: PartialUpdateTaskListDto,
  ): Promise<TaskListEntity> {
    const entity = await this.taskListsRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('task list not found');
    }

    this.taskListsRepository.merge(entity, payload);
    return this.taskListsRepository.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.taskListsRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('task list not found');
    }

    const result = await this.taskListsRepository.delete({ id });
    return result.affected === 1;
  }
}
