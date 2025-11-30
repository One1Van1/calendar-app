import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GetAllCategoriesResponseDto } from './get-all.response.dto';

export const ApiGetAllCategories = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить все категории',
      description: 'Возвращает список всех категорий с пагинацией',
    }),
    ApiOkResponse({
      type: GetAllCategoriesResponseDto,
      description: 'Категории успешно получены',
    }),
  );
