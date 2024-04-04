import { PickType } from '@nestjs/mapped-types';
import { BoardEntity } from '../entities/board.entity';

export class CreateBoardDto extends PickType(BoardEntity, ['name'] as const) {}
