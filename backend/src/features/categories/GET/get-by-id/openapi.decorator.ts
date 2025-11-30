import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { GetByIdCategoryResponseDto } from './get-by-id.response.dto';

export const ApiGetByIdCategory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Получить категорию по ID' }),
    ApiParam({ name: 'id', type: Number, description: 'ID категории' }),
    ApiOkResponse({
      type: GetByIdCategoryResponseDto,
      description: 'Категория найдена',
    }),
    ApiNotFoundResponse({
      description: 'Категория не найдена',
    }),
  );
