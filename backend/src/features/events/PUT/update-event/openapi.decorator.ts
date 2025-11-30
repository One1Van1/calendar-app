import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { UpdateEventResponseDto } from './update-event.response.dto';

export const ApiUpdateEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Обновить событие' }),
    ApiParam({ name: 'id', type: Number, description: 'ID события' }),
    ApiOkResponse({
      type: UpdateEventResponseDto,
      description: 'Событие успешно обновлено',
    }),
    ApiNotFoundResponse({
      description: 'Событие не найдено',
    }),
  );
