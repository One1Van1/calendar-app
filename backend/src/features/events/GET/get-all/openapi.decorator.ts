import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { GetAllEventsResponseDto } from './get-all.response.dto';

export const ApiGetAllEvents = () =>
  applyDecorators(
    ApiOperation({ summary: 'Получить все события с пагинацией' }),
    ApiQuery({ name: 'limit', required: false, type: Number, example: 10 }),
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
    ApiQuery({
      name: 'categoryId',
      required: false,
      type: Number,
      description: 'Фильтр по категории',
    }),
    ApiOkResponse({
      type: GetAllEventsResponseDto,
      description: 'События успешно получены',
    }),
  );
