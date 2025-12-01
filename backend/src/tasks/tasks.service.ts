import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskSubtask } from '../entities/task-subtask.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskSubtask)
    private readonly taskSubtaskRepository: Repository<TaskSubtask>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = this.taskRepository.create({
      name: createTaskDto.name,
      description: createTaskDto.description,
      date: new Date(createTaskDto.date),
      startTime: createTaskDto.startTime,
      endTime: createTaskDto.endTime,
      startDate: createTaskDto.startDate ? new Date(createTaskDto.startDate) : undefined,
      endDate: createTaskDto.endDate ? new Date(createTaskDto.endDate) : undefined,
    });

    // Создаем подзадачи если они есть
    if (createTaskDto.subtasks && createTaskDto.subtasks.length > 0) {
      task.subtasks = createTaskDto.subtasks.map((st, index) => {
        const subtask = new TaskSubtask();
        subtask.text = st.text;
        subtask.completed = st.completed || false;
        subtask.order = index;
        return subtask;
      });
    }

    // Вычисляем прогресс
    task.updateProgress();

    const savedTask = await this.taskRepository.save(task);
    return new TaskResponseDto(savedTask);
  }

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository.find({
      relations: ['subtasks'],
      order: {
        date: 'ASC',
        subtasks: { order: 'ASC' },
      },
    });

    return tasks.map((task) => new TaskResponseDto(task));
  }

  async findOne(id: number): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['subtasks'],
      order: { subtasks: { order: 'ASC' } },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return new TaskResponseDto(task);
  }

  async findByDateRange(startDate: string, endDate: string): Promise<TaskResponseDto[]> {
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.subtasks', 'subtasks')
      .where('task.date >= :startDate', { startDate })
      .andWhere('task.date <= :endDate', { endDate })
      .orderBy('task.date', 'ASC')
      .addOrderBy('subtasks.order', 'ASC')
      .getMany();

    return tasks.map((task) => new TaskResponseDto(task));
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['subtasks'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Обновляем базовые поля
    if (updateTaskDto.name !== undefined) task.name = updateTaskDto.name;
    if (updateTaskDto.description !== undefined) task.description = updateTaskDto.description;
    if (updateTaskDto.date !== undefined) task.date = new Date(updateTaskDto.date);
    if (updateTaskDto.startTime !== undefined) task.startTime = updateTaskDto.startTime;
    if (updateTaskDto.endTime !== undefined) task.endTime = updateTaskDto.endTime;
    if (updateTaskDto.startDate !== undefined) {
      task.startDate = updateTaskDto.startDate ? new Date(updateTaskDto.startDate) : undefined;
    }
    if (updateTaskDto.endDate !== undefined) {
      task.endDate = updateTaskDto.endDate ? new Date(updateTaskDto.endDate) : undefined;
    }

    // Обновляем подзадачи если они переданы
    if (updateTaskDto.subtasks !== undefined) {
      // Удаляем старые подзадачи
      if (task.subtasks && task.subtasks.length > 0) {
        await this.taskSubtaskRepository.remove(task.subtasks);
      }

      // Создаем новые подзадачи
      task.subtasks = updateTaskDto.subtasks.map((st, index) => {
        const subtask = new TaskSubtask();
        subtask.text = st.text;
        subtask.completed = st.completed || false;
        subtask.order = index;
        subtask.task = task;
        return subtask;
      });
    }

    // Обновляем прогресс
    task.updateProgress();

    const savedTask = await this.taskRepository.save(task);
    return new TaskResponseDto(savedTask);
  }

  async toggleSubtask(taskId: number, subtaskId: number): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      relations: ['subtasks'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    const subtask = task.subtasks.find((st) => st.id === subtaskId);
    if (!subtask) {
      throw new NotFoundException(`Subtask with ID ${subtaskId} not found`);
    }

    subtask.completed = !subtask.completed;
    await this.taskSubtaskRepository.save(subtask);

    // Обновляем прогресс задачи
    task.updateProgress();
    await this.taskRepository.save(task);

    return new TaskResponseDto(task);
  }

  async remove(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.remove(task);
  }
}
