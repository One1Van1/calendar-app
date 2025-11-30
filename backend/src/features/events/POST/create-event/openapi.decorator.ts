import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateEventResponseDto } from './create-event.response.dto';

export const ApiCreateEvent = () =>
  applyDecorators(
    ApiOperation({ summary: 'Создать новое событие' }),
    ApiCreatedResponse({
      type: CreateEventResponseDto,
      description: 'Событие успешно создано',
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные запроса',
    }),
  );
