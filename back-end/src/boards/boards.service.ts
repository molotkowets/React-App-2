import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { PartialUpdateBoardDto } from './dto/partial-update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}

  async create(payload: CreateBoardDto): Promise<BoardEntity> {
    const board = this.boardRepository.create(payload);
    return this.boardRepository.save(board);
  }

  async partialUpdate(
    id: number,
    payload: PartialUpdateBoardDto,
  ): Promise<BoardEntity> {
    const entity = await this.boardRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('board not found');
    }

    this.boardRepository.merge(entity, payload);
    return this.boardRepository.save(entity);
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.boardRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('board not found');
    }

    const result = await this.boardRepository.delete({ id });
    return result.affected === 1;
  }

  findAll(): Promise<BoardEntity[]> {
    return this.boardRepository.find();
  }

  async existsOrFail(id: number): Promise<true> {
    const isExists = await this.boardRepository.existsBy({ id });

    if (!isExists) {
      throw new NotFoundException('board not found');
    }

    return true;
  }
}
