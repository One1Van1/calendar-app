import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { GetByRangeResponseDto } from './get-by-range.response.dto';

export const ApiGetByRangeEvents = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Получить события за период',
      description: 'Возвращает все события в указанном диапазоне дат. Полезно для отображения календаря по месяцам/неделям.',
    }),
    ApiOkResponse({
      type: GetByRangeResponseDto,
      description: 'События успешно получены',
    }),
    ApiBadRequestResponse({
      description: 'Некорректные параметры запроса',
    }),
  );
