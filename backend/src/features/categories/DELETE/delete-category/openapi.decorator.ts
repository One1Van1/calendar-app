import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { DeleteCategoryResponseDto } from './delete-category.response.dto';

export const ApiDeleteCategory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Удалить категорию' }),
    ApiParam({ name: 'id', type: Number, description: 'ID категории' }),
    ApiOkResponse({
      type: DeleteCategoryResponseDto,
      description: 'Категория успешно удалена',
    }),
    ApiNotFoundResponse({
      description: 'Категория не найдена',
    }),
  );
