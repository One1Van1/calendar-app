import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../../entities/event.entity';
import { CreateEventRequestDto } from './create-event.request.dto';
import { CreateEventResponseDto } from './create-event.response.dto';

@Injectable()
export class CreateEventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(
    createDto: CreateEventRequestDto,
  ): Promise<CreateEventResponseDto> {
    const event = this.eventRepository.create({
      title: createDto.title,
      description: createDto.description,
      startDate: new Date(createDto.startDate),
      endDate: new Date(createDto.endDate),
      allDay: createDto.allDay ?? false,
      categoryId: createDto.categoryId,
    });

    const savedEvent = await this.eventRepository.save(event);

    return new CreateEventResponseDto(savedEvent);
  }
}
