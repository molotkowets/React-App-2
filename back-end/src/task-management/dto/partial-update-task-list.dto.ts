import { PartialType, PickType } from '@nestjs/mapped-types';
import { TaskListEntity } from '../entities/task-list.entity';

export class PartialUpdateTaskListDto extends PartialType(
  PickType(TaskListEntity, ['name'] as const),
) {}
