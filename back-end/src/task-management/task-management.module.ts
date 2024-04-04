import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListEntity } from './entities/task-list.entity';
import { TaskListsController } from './controllers/task-lists.controller';
import { TaskListsService } from './services/task-lists.service';
import { TaskEntity } from './entities/task.entity';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskListEntity, TaskEntity])],
  controllers: [TaskListsController, TasksController],
  providers: [TaskListsService, TasksService],
})
export class TaskManagementModule {}
