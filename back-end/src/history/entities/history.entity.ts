import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { HistoryActionEnum } from '../enums/history-action.enum';
import { HistoryEntitiesEnum } from '../enums/history-entities.enum';
import { IsEnum, IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

@Entity({
  name: 'history',
  orderBy: {
    id: 'ASC',
  },
})
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: HistoryActionEnum,
    nullable: false,
  })
  action: HistoryActionEnum;

  @IsNotEmpty()
  @IsEnum(HistoryEntitiesEnum)
  @Column({
    type: 'enum',
    enum: HistoryEntitiesEnum,
    nullable: false,
    name: 'entity_name',
  })
  entityName: HistoryEntitiesEnum;

  @Column({ type: 'jsonb' })
  data: {
    input: Record<string, any>; // [{ field: 'taskListId', oldValue: { id: 1, name: 'oldName ' }, newValue: { id: 2, name: 'New name' } }];
  };

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @Column({ type: 'int', name: 'entity_id' })
  entityId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
