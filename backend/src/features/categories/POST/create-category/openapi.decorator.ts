import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { CreateCategoryResponseDto } from './create-category.response.dto';

export const ApiCreateCategory = () =>
  applyDecorators(
    ApiOperation({ summary: 'Создать категорию' }),
    ApiCreatedResponse({
      type: CreateCategoryResponseDto,
      description: 'Категория успешно создана',
    }),
    ApiBadRequestResponse({
      description: 'Некорректные данные',
    }),
  );
