import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskListsService } from './task-lists.service';
import { PartialUpdateTaskDto } from '../dto/partial-update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private taskListsService: TaskListsService,
  ) {}

  async create(payload: CreateTaskDto): Promise<TaskEntity> {
    await this.taskListsService.existsOrFail(payload.taskListId);

    const task = this.taskRepository.create(payload);
    return this.taskRepository.save(task);
  }

  findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async findById(id: number): Promise<TaskEntity> {
    const entity = await this.taskRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('task not found');
    }

    return entity;
  }

  async partialUpdate(
    id: number,
    payload: PartialUpdateTaskDto,
  ): Promise<TaskEntity> {
    const entity = await this.taskRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('task not found');
    }

    if (payload.taskListId) {
      await this.taskListsService.existsOrFail(payload.taskListId);
    }

    this.taskRepository.merge(entity, payload);
    return this.taskRepository.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.taskRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('task not found');
    }

    const result = await this.taskRepository.delete({ id });
    return result.affected === 1;
  }
}
