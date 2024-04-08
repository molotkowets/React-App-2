import { Controller, Get } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryEntity } from './entities/history.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  async getHistory(): Promise<HistoryEntity[]> {
    return this.historyService.findAll();
  }
}
