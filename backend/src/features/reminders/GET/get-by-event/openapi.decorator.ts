import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { GetByEventRemindersResponseDto } from './get-by-event.response.dto';

export const ApiGetByEventReminders = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить напоминания для события',
      description: 'Возвращает все напоминания для указанного события',
    }),
    ApiParam({ name: 'eventId', type: Number, description: 'ID события' }),
    ApiOkResponse({
      type: GetByEventRemindersResponseDto,
      description: 'Напоминания успешно получены',
    }),
  );
