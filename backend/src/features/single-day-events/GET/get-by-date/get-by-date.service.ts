import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SingleDayEvent } from '../../../../entities/single-day-event.entity';
import { GetByDateQueryDto } from './get-by-date.query.dto';
import { GetByDateResponseDto } from './get-by-date.response.dto';
import { SingleDayEventResponseDto } from '../../POST/create/create.response.dto';

@Injectable()
export class GetByDateService {
  constructor(
    @InjectRepository(SingleDayEvent)
    private readonly repository: Repository<SingleDayEvent>,
  ) {}

  async execute(query: GetByDateQueryDto): Promise<GetByDateResponseDto> {
    // Парсим дату из строки YYYY-MM-DD без конвертации в UTC
    const [year, month, day] = query.date.split('-').map(Number);
    const dateOnly = new Date(year, month - 1, day);

    const events = await this.repository.find({
      where: {
        startDay: dateOnly,
      },
      relations: ['category'],
      order: {
        startTime: 'ASC',
      },
    });

    return {
      events: events.map(this.mapToResponse),
      total: events.length,
      date: query.date,
    };
  }

  private mapToResponse(event: SingleDayEvent): SingleDayEventResponseDto {
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      startDay: typeof event.startDay === 'string' ? event.startDay : event.startDay.toISOString().split('T')[0],
      endDay: typeof event.endDay === 'string' ? event.endDay : event.endDay.toISOString().split('T')[0],
      startTime: event.startTime,
      endTime: event.endTime,
      categoryId: event.categoryId,
      checklist: event.checklist,
      progress: event.progress,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }
}
