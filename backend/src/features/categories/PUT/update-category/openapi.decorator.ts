import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { UpdateCategoryResponseDto } from './update-category.response.dto';

export const ApiUpdateCategory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Обновить категорию' }),
    ApiParam({ name: 'id', type: Number, description: 'ID категории' }),
    ApiOkResponse({
      type: UpdateCategoryResponseDto,
      description: 'Категория успешно обновлена',
    }),
    ApiNotFoundResponse({
      description: 'Категория не найдена',
    }),
  );
