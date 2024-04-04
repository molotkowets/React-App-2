import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskListDto } from '../dto/create-task-list.dto';
import { TaskListsService } from '../services/task-lists.service';
import { TaskListEntity } from '../entities/task-list.entity';
import { PartialUpdateTaskListDto } from '../dto/partial-update-task-list.dto';
import { FetchTaskListsQueryDto } from '../dto/fetch-task-lists.query.dto';

@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Post()
  create(
    @Body() createTaskListDto: CreateTaskListDto,
  ): Promise<TaskListEntity> {
    return this.taskListsService.create(createTaskListDto);
  }

  @Get()
  fetchAll(@Query() query: FetchTaskListsQueryDto): Promise<TaskListEntity[]> {
    return this.taskListsService.findAll(query);
  }

  @Patch(':id')
  partialUpdate(
    @Body() dto: PartialUpdateTaskListDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TaskListEntity> {
    return this.taskListsService.partialUpdate(id, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ deleted: boolean }> {
    const isDeleted = await this.taskListsService.delete(id);
    return { deleted: isDeleted };
  }
}
