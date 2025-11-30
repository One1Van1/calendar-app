import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CreateReminderResponseDto } from './create-reminder.response.dto';

export const ApiCreateReminder = () =>
  applyDecorators(
    ApiOperation({ summary: 'Создать напоминание' }),
    ApiCreatedResponse({
      type: CreateReminderResponseDto,
      description: 'Напоминание успешно создано',
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
    }),
    ApiNotFoundResponse({
      description: 'Событие не найдено',
    }),
  );
