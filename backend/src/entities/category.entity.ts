import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 7 }) // #RRGGBB format
  color: string;

  @OneToMany('Event', 'category')
  events: Event[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
