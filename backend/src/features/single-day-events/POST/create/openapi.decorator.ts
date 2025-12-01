import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { SingleDayEventResponseDto } from './create.response.dto';

export const ApiCreateSingleDayEvent = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Создать событие на один день',
      description: 'Создаёт новое событие с опциональным чек-листом и прогресс-баром',
    }),
    ApiResponse({
      status: 201,
      description: 'Событие успешно создано',
      type: SingleDayEventResponseDto,
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
    }),
  );
