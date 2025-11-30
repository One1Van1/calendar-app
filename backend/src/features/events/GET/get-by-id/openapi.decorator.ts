import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { GetByIdEventResponseDto } from './get-by-id.response.dto';

export const ApiGetByIdEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Получить событие по ID' }),
    ApiParam({ name: 'id', type: Number, description: 'ID события' }),
    ApiOkResponse({
      type: GetByIdEventResponseDto,
      description: 'Событие найдено',
    }),
    ApiNotFoundResponse({
      description: 'Событие не найдено',
    }),
  );
