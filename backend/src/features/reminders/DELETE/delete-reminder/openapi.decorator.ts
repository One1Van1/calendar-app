import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { DeleteReminderResponseDto } from './delete-reminder.response.dto';

export const ApiDeleteReminder = () =>
  applyDecorators(
    ApiOperation({ summary: 'Удалить напоминание' }),
    ApiParam({ name: 'id', type: Number, description: 'ID напоминания' }),
    ApiOkResponse({
      type: DeleteReminderResponseDto,
      description: 'Напоминание успешно удалено',
    }),
    ApiNotFoundResponse({
      description: 'Напоминание не найдено',
    }),
  );
