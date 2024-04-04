import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { PartialUpdateTaskDto } from '../dto/partial-update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto): Promise<TaskEntity> {
    return this.tasksService.create(dto);
  }

  @Get(':id')
  fetchById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
  partialUpdate(
    @Body() dto: PartialUpdateTaskDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskEntity> {
    return this.tasksService.partialUpdate(id, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ deleted: boolean }> {
    const isDeleted = await this.tasksService.delete(id);
    return { deleted: isDeleted };
  }
}
