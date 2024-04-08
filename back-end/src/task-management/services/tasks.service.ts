import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { has, isEqual } from 'lodash';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { TaskListsService } from './task-lists.service';
import { PartialUpdateTaskDto } from '../dto/partial-update-task.dto';
import { BoardsService } from '../../boards/boards.service';
import { HistoryService } from '../../history/history.service';
import { HistoryActionEnum } from '../../history/enums/history-action.enum';
import { HistoryEntitiesEnum } from '../../history/enums/history-entities.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private taskListsService: TaskListsService,
    private boardsService: BoardsService,
    private historyService: HistoryService,
  ) {}

  async create(payload: CreateTaskDto): Promise<TaskEntity> {
    await Promise.all([
      this.taskListsService.existsOrFail(payload.taskListId),
      this.boardsService.existsOrFail(payload.boardId),
    ]);

    const task = this.taskRepository.create(payload);
    const entity = await this.taskRepository.save(task);
    await this.historyService.create({
      action: HistoryActionEnum.CREATE,
      entityName: HistoryEntitiesEnum.TASK_ENTITY,
      entityId: entity.id,
      data: { input: entity },
    });

    return entity;
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
    const [entity, taskList] = await Promise.all([
      this.taskRepository.findOne({
        where: { id },
        relations: payload.taskListId ? ['taskList'] : [],
      }),
      payload.taskListId
        ? this.taskListsService.findOneById(payload.taskListId)
        : null,
    ]);

    if (!entity) {
      throw new NotFoundException('task not found');
    }

    if (payload.taskListId && taskList.boardId !== entity.boardId) {
      throw new ConflictException('Cannot move task to another board');
    }

    const updatedFields = this.getUpdatedFields(entity, payload);

    if (updatedFields.has('taskListId')) {
      const updatedTaskListIdField = updatedFields.get('taskListId');
      updatedFields.set('taskListId', {
        oldValue: updatedTaskListIdField.oldValue,
        newValue: updatedTaskListIdField.newValue,
        oldLabel: entity.taskList.name,
        newLabel: taskList.name,
      });
    }

    console.log('updatedFields = ', updatedFields);

    this.taskRepository.merge(entity, payload);

    if (payload.taskListId) {
      entity.taskList = taskList;
    }

    await this.taskRepository.save(entity);

    if (updatedFields.size !== 0) {
      await this.historyService.create({
        action: HistoryActionEnum.UPDATE,
        entityName: HistoryEntitiesEnum.TASK_ENTITY,
        entityId: entity.id,
        data: { input: Object.fromEntries(updatedFields.entries()) },
      });
    }

    return entity;
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.taskRepository.findOne({
      where: { id },
      relations: ['taskList'],
    });

    if (!entity) {
      throw new NotFoundException('task not found');
    }

    const result = await this.taskRepository.delete({ id });

    if (result.affected === 1) {
      await this.historyService.create({
        action: HistoryActionEnum.DELETE,
        entityName: HistoryEntitiesEnum.TASK_ENTITY,
        entityId: entity.id,
        data: { input: entity },
      });
    }

    return result.affected === 1;
  }

  private getUpdatedFields(
    entity: TaskEntity,
    payload: PartialUpdateTaskDto,
  ): Map<
    string,
    { oldValue: unknown; newValue: unknown; [k: string]: unknown }
  > {
    const updatedFields = new Map<
      string,
      { oldValue: unknown; newValue: unknown; [k: string]: unknown }
    >();

    Object.keys(payload).forEach((key) => {
      const value = payload[key];
      if (has(entity, key) && !isEqual(value, entity[key])) {
        updatedFields.set(key, {
          oldValue: entity[key],
          newValue: value,
        });
      }
    });

    return updatedFields;
  }
}
