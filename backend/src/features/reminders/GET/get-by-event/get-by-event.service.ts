import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reminder } from '../../../../entities/reminder.entity';
import { GetByEventRemindersResponseDto } from './get-by-event.response.dto';

@Injectable()
export class GetByEventRemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  async execute(eventId: number): Promise<GetByEventRemindersResponseDto> {
    const reminders = await this.reminderRepository.find({
      where: { eventId },
      relations: ['event'],
      order: {
        reminderTime: 'ASC',
      },
    });

    return new GetByEventRemindersResponseDto(reminders, eventId);
  }
}
