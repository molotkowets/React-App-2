import { PartialType, PickType } from '@nestjs/mapped-types';
import { TaskEntity } from '../entities/task.entity';

export class PartialUpdateTaskDto extends PartialType(
  PickType(TaskEntity, [
    'name',
    'description',
    'dueDate',
    'priority',
    'taskListId',
  ] as const),
) {}
