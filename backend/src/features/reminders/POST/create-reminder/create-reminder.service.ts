import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reminder } from '../../../../entities/reminder.entity';
import { Event } from '../../../../entities/event.entity';
import { CreateReminderRequestDto } from './create-reminder.request.dto';
import { CreateReminderResponseDto } from './create-reminder.response.dto';

@Injectable()
export class CreateReminderService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(
    createDto: CreateReminderRequestDto,
  ): Promise<CreateReminderResponseDto> {
    // Проверяем, что событие существует
    const event = await this.eventRepository.findOne({
      where: { id: createDto.eventId },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${createDto.eventId} not found`);
    }

    const reminder = this.reminderRepository.create({
      eventId: createDto.eventId,
      reminderTime: new Date(createDto.reminderTime),
      isSent: false,
    });

    const savedReminder = await this.reminderRepository.save(reminder);

    return new CreateReminderResponseDto(savedReminder);
  }
}
