import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RemindersService } from './reminders.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { ReminderResponseDto } from './dto/reminder-response.dto';

@ApiTags('Reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новое напоминание' })
  @ApiResponse({ status: 201, type: ReminderResponseDto })
  create(@Body() createReminderDto: CreateReminderDto): Promise<ReminderResponseDto> {
    return this.remindersService.create(createReminderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все напоминания или по дате' })
  @ApiQuery({ name: 'date', required: false, example: '2025-12-01' })
  @ApiResponse({ status: 200, type: [ReminderResponseDto] })
  findAll(@Query('date') date?: string): Promise<ReminderResponseDto[]> {
    if (date) {
      return this.remindersService.findByDate(date);
    }
    return this.remindersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить напоминание по ID' })
  @ApiResponse({ status: 200, type: ReminderResponseDto })
  @ApiResponse({ status: 404, description: 'Напоминание не найдено' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ReminderResponseDto> {
    return this.remindersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить напоминание' })
  @ApiResponse({ status: 200, type: ReminderResponseDto })
  @ApiResponse({ status: 404, description: 'Напоминание не найдено' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReminderDto: UpdateReminderDto,
  ): Promise<ReminderResponseDto> {
    return this.remindersService.update(id, updateReminderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Удалить напоминание' })
  @ApiResponse({ status: 204, description: 'Напоминание успешно удалено' })
  @ApiResponse({ status: 404, description: 'Напоминание не найдено' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.remindersService.remove(id);
  }
}
