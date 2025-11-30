import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { DeleteEventResponseDto } from './delete-event.response.dto';

export const ApiDeleteEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Удалить событие' }),
    ApiParam({ name: 'id', type: Number, description: 'ID события' }),
    ApiOkResponse({
      type: DeleteEventResponseDto,
      description: 'Событие успешно удалено',
    }),
    ApiNotFoundResponse({
      description: 'Событие не найдено',
    }),
  );
