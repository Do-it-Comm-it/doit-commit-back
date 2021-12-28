import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  uid: string;

  @Column({ type: 'varchar', length: 8 })
  nickname?: string;

  @Column({ type: 'varchar' })
  email?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  tech?: string;

  @Column({ nullable: true })
  position?: string;

  @Column({ nullable: true })
  url1?: string;

  @Column({ nullable: true })
  url2?: string;

  @Column({ nullable: true })
  githubUrl?: string;

  @CreateDateColumn()
  created?: Date;

  @UpdateDateColumn()
  updated?: Date;
}

export interface ResponseSaveUser {
  uid: string;
  nickname?: string;
  email?: string;
  image?: string;
  tech?: string[];
  position?: string;
}
