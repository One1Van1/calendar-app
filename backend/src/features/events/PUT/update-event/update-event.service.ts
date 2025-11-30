import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../../entities/event.entity';
import { UpdateEventRequestDto } from './update-event.request.dto';
import { UpdateEventResponseDto } from './update-event.response.dto';

@Injectable()
export class UpdateEventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(
    id: number,
    updateDto: UpdateEventRequestDto,
  ): Promise<UpdateEventResponseDto | null> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      return null;
    }

    if (updateDto.title !== undefined) event.title = updateDto.title;
    if (updateDto.description !== undefined) event.description = updateDto.description;
    if (updateDto.startDate !== undefined) event.startDate = new Date(updateDto.startDate);
    if (updateDto.endDate !== undefined) event.endDate = new Date(updateDto.endDate);
    if (updateDto.allDay !== undefined) event.allDay = updateDto.allDay;
    if (updateDto.categoryId !== undefined) event.categoryId = updateDto.categoryId;

    const updatedEvent = await this.eventRepository.save(event);

    return new UpdateEventResponseDto(updatedEvent);
  }
}
