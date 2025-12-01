import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subtask } from './subtask.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time', nullable: true, name: 'start_time' })
  startTime?: string;

  @Column({ type: 'time', nullable: true, name: 'end_time' })
  endTime?: string;

  @Column({ type: 'date', nullable: true, name: 'start_date' })
  startDate?: Date;

  @Column({ type: 'date', nullable: true, name: 'end_date' })
  endDate?: Date;

  @OneToMany(() => Subtask, (subtask) => subtask.event, {
    cascade: true,
    eager: true,
  })
  subtasks: Subtask[];

  @Column({ type: 'integer', default: 0 })
  progress: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /**
   * Вычисляет прогресс на основе выполненных подзадач
   */
  calculateProgress(): number {
    if (!this.subtasks || this.subtasks.length === 0) {
      return 0;
    }

    const completedCount = this.subtasks.filter((st) => st.completed).length;
    return Math.round((completedCount / this.subtasks.length) * 100);
  }

  /**
   * Обновляет поле progress на основе подзадач
   */
  updateProgress(): void {
    this.progress = this.calculateProgress();
  }
}
