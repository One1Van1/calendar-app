import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../../entities/event.entity';
import { GetAllEventsQueryDto } from './get-all.query.dto';
import { GetAllEventsResponseDto } from './get-all.response.dto';

@Injectable()
export class GetAllEventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async execute(
    query: GetAllEventsQueryDto,
  ): Promise<GetAllEventsResponseDto> {
    const { limit = 10, page = 1, categoryId } = query;

    const queryBuilder = this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.category', 'category')
      .leftJoinAndSelect('event.reminders', 'reminders');

    if (categoryId) {
      queryBuilder.where('event.categoryId = :categoryId', { categoryId });
    }

    queryBuilder
      .orderBy('event.startDate', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    return new GetAllEventsResponseDto(items, total, page, limit);
  }
}
