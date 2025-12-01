import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reminder } from '../entities/reminder.entity';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { ReminderResponseDto } from './dto/reminder-response.dto';

@Injectable()
export class RemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  async create(createReminderDto: CreateReminderDto): Promise<ReminderResponseDto> {
    const reminder = this.reminderRepository.create({
      name: createReminderDto.name,
      description: createReminderDto.description,
      date: new Date(createReminderDto.date),
      time: createReminderDto.time,
    });

    const savedReminder = await this.reminderRepository.save(reminder);
    return new ReminderResponseDto(savedReminder);
  }

  async findAll(): Promise<ReminderResponseDto[]> {
    const reminders = await this.reminderRepository.find({
      order: { date: 'ASC', time: 'ASC' },
    });

    return reminders.map((reminder) => new ReminderResponseDto(reminder));
  }

  async findOne(id: number): Promise<ReminderResponseDto> {
    const reminder = await this.reminderRepository.findOne({
      where: { id },
    });

    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }

    return new ReminderResponseDto(reminder);
  }

  async findByDate(date: string): Promise<ReminderResponseDto[]> {
    const reminders = await this.reminderRepository
      .createQueryBuilder('reminder')
      .where('reminder.date = :date', { date })
      .orderBy('reminder.time', 'ASC')
      .getMany();

    return reminders.map((reminder) => new ReminderResponseDto(reminder));
  }

  async update(id: number, updateReminderDto: UpdateReminderDto): Promise<ReminderResponseDto> {
    const reminder = await this.reminderRepository.findOne({
      where: { id },
    });

    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }

    if (updateReminderDto.name !== undefined) reminder.name = updateReminderDto.name;
    if (updateReminderDto.description !== undefined) reminder.description = updateReminderDto.description;
    if (updateReminderDto.date !== undefined) reminder.date = new Date(updateReminderDto.date);
    if (updateReminderDto.time !== undefined) reminder.time = updateReminderDto.time;

    const savedReminder = await this.reminderRepository.save(reminder);
    return new ReminderResponseDto(savedReminder);
  }

  async remove(id: number): Promise<void> {
    const reminder = await this.reminderRepository.findOne({ where: { id } });

    if (!reminder) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }

    await this.reminderRepository.remove(reminder);
  }
}
