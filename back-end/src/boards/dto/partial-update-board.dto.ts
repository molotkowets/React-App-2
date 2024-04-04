import { PartialType, PickType } from '@nestjs/mapped-types';
import { BoardEntity } from '../entities/board.entity';

export class PartialUpdateBoardDto extends PartialType(
  PickType(BoardEntity, ['name'] as const),
) {}
