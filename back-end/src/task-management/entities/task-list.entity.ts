import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';
import { Type } from 'class-transformer';

@Entity({
  name: 'task_lists',
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

  @OneToMany(() => TaskEntity, (task) => task.taskList)
  @Type(() => TaskEntity)
  tasks: TaskEntity[];
}
