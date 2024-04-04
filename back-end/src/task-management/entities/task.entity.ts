import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskPriorityEnum } from '../enum/task-priority.enum';
import { TaskListEntity } from './task-list.entity';

@Entity({
  name: 'tasks',
})
export class TaskEntity {
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

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  @IsNotEmpty()
  @MaxLength(500)
  @IsString()
  @IsOptional()
  description?: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'due_date',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dueDate?: Date;

  @Column({
    type: 'enum',
    enum: TaskPriorityEnum,
  })
  @IsNotEmpty()
  @IsEnum(TaskPriorityEnum)
  priority: TaskPriorityEnum;

  @Column({ type: 'int', name: 'task_list_id' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  taskListId: number;

  @JoinColumn({
    name: 'task_list_id',
  })
  @ManyToOne(() => TaskListEntity, (taskList) => taskList.tasks, {
    onDelete: 'CASCADE',
  })
  @Type(() => TaskListEntity)
  taskList: TaskListEntity;
}
