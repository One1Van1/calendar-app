import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reminder } from '../../../../entities/reminder.entity';
import { GetAllRemindersQueryDto } from './get-all.query.dto';
import { GetAllRemindersResponseDto } from './get-all.response.dto';

@Injectable()
export class GetAllRemindersService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepository: Repository<Reminder>,
  ) {}

  async execute(
    query: GetAllRemindersQueryDto,
  ): Promise<GetAllRemindersResponseDto> {
    const limit = query.limit || 50;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const [reminders, total] = await this.reminderRepository.findAndCount({
      take: limit,
      skip,
      relations: ['event'],
      order: {
        reminderTime: 'ASC',
      },
    });

    return new GetAllRemindersResponseDto(reminders, total, page, limit);
  }
}
