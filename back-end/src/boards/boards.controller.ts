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
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardEntity } from './entities/board.entity';
import { BoardsService } from './boards.service';
import { PartialUpdateBoardDto } from './dto/partial-update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post('create')
  create(@Body() dto: CreateBoardDto): Promise<BoardEntity> {
    return this.boardsService.create(dto);
  }

  @Get()
  fetchAll(): Promise<BoardEntity[]> {
    return this.boardsService.findAll();
  }

  @Patch(':id')
  partialUpdate(
    @Body() dto: PartialUpdateBoardDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BoardEntity> {
    return this.boardsService.partialUpdate(id, dto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ deleted: boolean }> {
    const isDeleted = await this.boardsService.delete(id);
    return { deleted: isDeleted };
  }
}
