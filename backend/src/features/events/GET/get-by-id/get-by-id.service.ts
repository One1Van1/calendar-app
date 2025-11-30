import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../../entities/event.entity';
import { GetByIdEventResponseDto } from './get-by-id.response.dto';

@Injectable()
export class GetByIdEventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(id: number): Promise<GetByIdEventResponseDto | null> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['category', 'reminders'],
    });

    if (!event) {
      return null;
    }

    return new GetByIdEventResponseDto(event);
  }
}
