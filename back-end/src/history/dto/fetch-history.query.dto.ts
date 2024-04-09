import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive } from 'class-validator';
import { HistoryEntitiesEnum } from '../enums/history-entities.enum';

export class FetchHistoryQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  entityId?: number;

  @IsOptional()
  @IsEnum(HistoryEntitiesEnum)
  entityName?: HistoryEntitiesEnum;
}
