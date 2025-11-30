import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Reminder } from '../../../../entities/reminder.entity';
import { GetPendingRemindersResponseDto } from './get-pending.response.dto';

@Injectable()
export class GetPendingRemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  async execute(): Promise<GetPendingRemindersResponseDto> {
    const now = new Date();

    const reminders = await this.reminderRepository.find({
      where: {
        isSent: false,
        reminderTime: LessThanOrEqual(now),
      },
      relations: ['event'],
      order: {
        reminderTime: 'ASC',
      },
    });

    return new GetPendingRemindersResponseDto(reminders);
  }
}
