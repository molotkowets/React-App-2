import { PickType } from '@nestjs/mapped-types';
import { TaskEntity } from '../entities/task.entity';

export class CreateTaskDto extends PickType(TaskEntity, [
  'name',
  'dueDate',
  'priority',
  'taskListId',
  'description',
] as const) {}
