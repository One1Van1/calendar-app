import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GetAllRemindersResponseDto } from './get-all.response.dto';

export const ApiGetAllReminders = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить все напоминания',
      description: 'Возвращает список всех напоминаний с пагинацией',
    }),
    ApiOkResponse({
      type: GetAllRemindersResponseDto,
      description: 'Напоминания успешно получены',
    }),
  );
