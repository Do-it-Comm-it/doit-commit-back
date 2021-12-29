import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TodoType {
  NOTSTARTED = 'not-started',
  INPROGRESS = 'in-progress',
  COMPLETE = 'complete',
}

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 20 })
  title?: string;

  @Column({ type: 'varchar' })
  body?: string;

  @Column({ nullable: true })
  userId?: number;

  @Column({ type: 'enum', enum: TodoType, default: TodoType.NOTSTARTED })
  type: string;

  @Column({ type: 'boolean', default: false })
  checked: boolean;

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated?: Date;
}
