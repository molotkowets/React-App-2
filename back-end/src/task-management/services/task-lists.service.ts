import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskListEntity } from '../entities/task-list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from '../dto/create-task-list.dto';
import { PartialUpdateTaskListDto } from '../dto/partial-update-task-list.dto';

@Injectable()
export class TaskListsService {
  constructor(
    @InjectRepository(TaskListEntity)
    private taskListsRepository: Repository<TaskListEntity>,
  ) {}

  async create(payload: CreateTaskListDto): Promise<TaskListEntity> {
    const taskList = this.taskListsRepository.create(payload);
    return this.taskListsRepository.save(taskList);
  }

  findAll(): Promise<TaskListEntity[]> {
    return this.taskListsRepository.find({ relations: { tasks: true } });
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
