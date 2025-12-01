import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SingleDayEvent } from '../../../../entities/single-day-event.entity';
import { CreateSingleDayEventDto } from './create.dto';
import { SingleDayEventResponseDto } from './create.response.dto';

@Injectable()
export class CreateSingleDayEventService {
  constructor(
    @InjectRepository(SingleDayEvent)
    private readonly repository: Repository<SingleDayEvent>,
  ) {}

  async execute(dto: CreateSingleDayEventDto): Promise<SingleDayEventResponseDto> {
    const event = new SingleDayEvent();
    event.name = dto.name;
    event.description = dto.description;
    
    // Парсим дату из строки YYYY-MM-DD без конвертации в UTC
    const [year, month, day] = dto.day.split('-').map(Number);
    const dateOnly = new Date(year, month - 1, day);
    
    event.startDay = dateOnly;
    event.endDay = dateOnly;
    
    event.startTime = dto.startTime;
    event.endTime = dto.endTime;
    event.categoryId = dto.categoryId;
    event.checklist = dto.checklist;

    // Вычисляем прогресс если есть чек-лист
    if (event.checklist && event.checklist.length > 0) {
      event.updateProgress();
    }

    const saved = await this.repository.save(event);

    return this.mapToResponse(saved);
  }

  private mapToResponse(event: SingleDayEvent): SingleDayEventResponseDto {
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      startDay: event.startDay.toISOString().split('T')[0],
      endDay: event.endDay.toISOString().split('T')[0],
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
