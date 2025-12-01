import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { Subtask } from '../entities/subtask.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventResponseDto } from './dto/event-response.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<EventResponseDto> {
    const event = this.eventRepository.create({
      name: createEventDto.name,
      description: createEventDto.description,
      date: new Date(createEventDto.date),
      startTime: createEventDto.startTime,
      endTime: createEventDto.endTime,
      startDate: createEventDto.startDate ? new Date(createEventDto.startDate) : undefined,
      endDate: createEventDto.endDate ? new Date(createEventDto.endDate) : undefined,
    });

    // Создаем подзадачи если они есть
    if (createEventDto.subtasks && createEventDto.subtasks.length > 0) {
      event.subtasks = createEventDto.subtasks.map((st, index) => {
        const subtask = new Subtask();
        subtask.text = st.text;
        subtask.completed = st.completed || false;
        subtask.order = index;
        return subtask;
      });
    }

    // Вычисляем прогресс
    event.updateProgress();

    const savedEvent = await this.eventRepository.save(event);
    return new EventResponseDto(savedEvent);
  }

  async findAll(): Promise<EventResponseDto[]> {
    const events = await this.eventRepository.find({
      relations: ['subtasks'],
      order: {
        date: 'ASC',
        subtasks: { order: 'ASC' },
      },
    });

    return events.map((event) => new EventResponseDto(event));
  }

  async findOne(id: number): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['subtasks'],
      order: { subtasks: { order: 'ASC' } },
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return new EventResponseDto(event);
  }

  async findByDateRange(startDate: string, endDate: string): Promise<EventResponseDto[]> {
    const events = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.subtasks', 'subtasks')
      .where('event.date >= :startDate', { startDate })
      .andWhere('event.date <= :endDate', { endDate })
      .orderBy('event.date', 'ASC')
      .addOrderBy('subtasks.order', 'ASC')
      .getMany();

    return events.map((event) => new EventResponseDto(event));
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['subtasks'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    // Обновляем базовые поля
    if (updateEventDto.name !== undefined) event.name = updateEventDto.name;
    if (updateEventDto.description !== undefined) event.description = updateEventDto.description;
    if (updateEventDto.date !== undefined) event.date = new Date(updateEventDto.date);
    if (updateEventDto.startTime !== undefined) event.startTime = updateEventDto.startTime;
    if (updateEventDto.endTime !== undefined) event.endTime = updateEventDto.endTime;
    if (updateEventDto.startDate !== undefined) {
      event.startDate = updateEventDto.startDate ? new Date(updateEventDto.startDate) : undefined;
    }
    if (updateEventDto.endDate !== undefined) {
      event.endDate = updateEventDto.endDate ? new Date(updateEventDto.endDate) : undefined;
    }

    // Обновляем подзадачи если они переданы
    if (updateEventDto.subtasks !== undefined) {
      // Удаляем старые подзадачи
      if (event.subtasks && event.subtasks.length > 0) {
        await this.subtaskRepository.remove(event.subtasks);
      }

      // Создаем новые подзадачи
      event.subtasks = updateEventDto.subtasks.map((st, index) => {
        const subtask = new Subtask();
        subtask.text = st.text;
        subtask.completed = st.completed || false;
        subtask.order = index;
        subtask.event = event;
        return subtask;
      });
    }

    // Обновляем прогресс
    event.updateProgress();

    const savedEvent = await this.eventRepository.save(event);
    return new EventResponseDto(savedEvent);
  }

  async toggleSubtask(eventId: number, subtaskId: number): Promise<EventResponseDto> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['subtasks'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${eventId} not found`);
    }

    const subtask = event.subtasks.find((st) => st.id === subtaskId);
    if (!subtask) {
      throw new NotFoundException(`Subtask with ID ${subtaskId} not found`);
    }

    subtask.completed = !subtask.completed;
    await this.subtaskRepository.save(subtask);

    // Обновляем прогресс события
    event.updateProgress();
    await this.eventRepository.save(event);

    return new EventResponseDto(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.eventRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await this.eventRepository.remove(event);
  }
}
