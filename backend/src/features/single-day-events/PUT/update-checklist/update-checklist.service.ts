import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SingleDayEvent } from '../../../../entities/single-day-event.entity';
import { UpdateChecklistDto } from './update-checklist.dto';
import { SingleDayEventResponseDto } from '../../POST/create/create.response.dto';

@Injectable()
export class UpdateChecklistService {
  constructor(
    @InjectRepository(SingleDayEvent)
    private readonly repository: Repository<SingleDayEvent>,
  ) {}

  async execute(id: number, dto: UpdateChecklistDto): Promise<SingleDayEventResponseDto> {
    const event = await this.repository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Событие с ID ${id} не найдено`);
    }

    event.checklist = dto.checklist;
    event.updateProgress(); // Автоматически пересчитываем прогресс

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
