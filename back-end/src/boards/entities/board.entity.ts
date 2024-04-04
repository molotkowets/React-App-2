import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '../../task-management/entities/task.entity';
import { Type } from 'class-transformer';
import { TaskListEntity } from '../../task-management/entities/task-list.entity';

@Entity({
  name: 'boards',
  orderBy: {
    id: 'ASC',
  },
})
export class BoardEntity {
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

  @OneToMany(() => TaskEntity, (task) => task.board)
  @Type(() => TaskEntity)
  tasks: TaskEntity[];

  @OneToMany(() => TaskListEntity, (taskList) => taskList.board)
  @Type(() => TaskListEntity)
  taskLists: TaskListEntity[];
}
