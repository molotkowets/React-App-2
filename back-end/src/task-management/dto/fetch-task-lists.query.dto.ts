import { PickType } from '@nestjs/mapped-types';
import { TaskListEntity } from '../entities/task-list.entity';

export class FetchTaskListsQueryDto extends PickType(TaskListEntity, [
  'boardId',
] as const) {}
