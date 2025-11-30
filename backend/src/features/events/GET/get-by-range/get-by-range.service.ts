import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Event } from '../../../../entities/event.entity';
import { GetByRangeQueryDto } from './get-by-range.query.dto';
import { GetByRangeResponseDto } from './get-by-range.response.dto';

@Injectable()
export class GetByRangeEventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(query: GetByRangeQueryDto): Promise<GetByRangeResponseDto> {
    const startDate = new Date(query.startDate);
    const endDate = new Date(query.endDate);

    const events = await this.eventRepository.find({
      where: {
        startDate: Between(startDate, endDate),
      },
      relations: ['category', 'reminders'],
      order: {
        startDate: 'ASC',
      },
    });

    return new GetByRangeResponseDto(events, startDate, endDate);
  }
}
