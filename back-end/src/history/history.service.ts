import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';

import { HistoryEntity } from './entities/history.entity';
import { FetchHistoryQueryDto } from './dto/fetch-history.query.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private readonly _historyRepository: Repository<HistoryEntity>,
  ) {}

  async create(input: DeepPartial<HistoryEntity>): Promise<void> {
    const history = this._historyRepository.create(input);
    await this._historyRepository.save(history);
  }

  findAll(query?: FetchHistoryQueryDto): Promise<HistoryEntity[]> {
    return this._historyRepository.find({
      where: query,
    });
  }
}
