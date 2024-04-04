import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';
import { Type } from 'class-transformer';
import { BoardEntity } from '../../boards/entities/board.entity';

@Entity({
  name: 'task_lists',
  orderBy: {
    id: 'ASC',
  },
})
export class TaskListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  name: string;

  @Column({ type: 'int', name: 'board_id' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  boardId: number;

  @OneToMany(() => TaskEntity, (task) => task.taskList)
  @Type(() => TaskEntity)
  tasks: TaskEntity[];

  @JoinColumn({
    name: 'board_id',
  })
  @ManyToOne(() => BoardEntity, (board) => board.taskLists, {
    onDelete: 'CASCADE',
  })
  @Type(() => BoardEntity)
  board: BoardEntity;
}
