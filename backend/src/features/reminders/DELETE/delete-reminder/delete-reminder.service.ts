import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reminder } from '../../../../entities/reminder.entity';
import { DeleteReminderResponseDto } from './delete-reminder.response.dto';

@Injectable()
export class DeleteReminderService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  async execute(id: number): Promise<DeleteReminderResponseDto | null> {
    const reminder = await this.reminderRepository.findOne({ where: { id } });

    if (!reminder) {
      return null;
    }

    await this.reminderRepository.remove(reminder);

    return new DeleteReminderResponseDto(id);
  }
}
