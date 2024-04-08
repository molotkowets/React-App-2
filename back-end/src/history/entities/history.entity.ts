import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { HistoryActionEnum } from '../enums/history-action.enum';
import { HistoryEntitiesEnum } from '../enums/history-entities.enum';

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

  @Column({ type: 'int', name: 'entity_id' })
  entityId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
