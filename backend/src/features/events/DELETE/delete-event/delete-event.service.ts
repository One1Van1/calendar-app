import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../../entities/event.entity';
import { DeleteEventResponseDto } from './delete-event.response.dto';

@Injectable()
export class DeleteEventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(id: number): Promise<DeleteEventResponseDto | null> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      return null;
    }

    await this.eventRepository.remove(event);

    return new DeleteEventResponseDto(id);
  }
}
