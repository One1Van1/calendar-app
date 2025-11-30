import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Event', 'reminders', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column({ name: 'event_id' })
  eventId: number;

  @Column({ type: 'timestamp', name: 'reminder_time' })
  reminderTime: Date;

  @Column({ type: 'boolean', default: false, name: 'is_sent' })
  isSent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
