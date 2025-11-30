import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class GetByRangeQueryDto {
  @ApiProperty({
    example: '2025-12-01T00:00:00.000Z',
    description: 'Начальная дата диапазона (ISO 8601)',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2025-12-31T23:59:59.999Z',
    description: 'Конечная дата диапазона (ISO 8601)',
  })
  @IsDateString()
  endDate: string;
}
