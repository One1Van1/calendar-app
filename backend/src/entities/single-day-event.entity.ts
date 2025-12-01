import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

/**
 * Элемент чек-листа для события
 */
export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

@Entity('single_day_events')
export class SingleDayEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date', name: 'start_day' })
  startDay: Date;

  @Column({ type: 'date', name: 'end_day' })
  endDay: Date;

  @Column({ type: 'time', nullable: true, name: 'start_time' })
  startTime?: string;

  @Column({ type: 'time', nullable: true, name: 'end_time' })
  endTime?: string;

  @ManyToOne('Category', { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column({ name: 'category_id', nullable: true })
  categoryId?: number;

  /**
   * Чек-лист задач для события (опционально)
   * Хранится как JSON
   */
  @Column({ type: 'jsonb', nullable: true })
  checklist?: ChecklistItem[];

  /**
   * Прогресс выполнения в процентах (0-100)
   * Вычисляется автоматически на основе чек-листа
   */
  @Column({ type: 'integer', nullable: true, default: 0 })
  progress?: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * Вычисляет прогресс на основе чек-листа
   */
  calculateProgress(): number {
    if (!this.checklist || this.checklist.length === 0) {
      return 0;
    }

    const completedItems = this.checklist.filter((item) => item.completed).length;
    return Math.round((completedItems / this.checklist.length) * 100);
  }

  /**
   * Обновляет прогресс на основе чек-листа
   */
  updateProgress(): void {
    this.progress = this.calculateProgress();
  }
}
