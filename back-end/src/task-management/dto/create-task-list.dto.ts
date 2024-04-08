import { PickType } from '@nestjs/mapped-types';
import { TaskListEntity } from '../entities/task-list.entity';

export class CreateTaskListDto extends PickType(TaskListEntity, [
  'name',
  'boardId',
] as const) {}
