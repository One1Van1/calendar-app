import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GetPendingRemindersResponseDto } from './get-pending.response.dto';

export const ApiGetPendingReminders = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить предстоящие напоминания',
      description: 'Возвращает все неотправленные напоминания, время которых уже наступило или прошло',
    }),
    ApiOkResponse({
      type: GetPendingRemindersResponseDto,
      description: 'Предстоящие напоминания получены',
    }),
  );
