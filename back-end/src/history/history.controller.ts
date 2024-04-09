import { Controller, Get, Query } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryEntity } from './entities/history.entity';
import { FetchHistoryQueryDto } from './dto/fetch-history.query.dto';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getHistory(
    @Query() query: FetchHistoryQueryDto,
  ): Promise<HistoryEntity[]> {
    return this.historyService.findAll(query);
  }
}
