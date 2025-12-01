import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class GetByDateQueryDto {
  @ApiProperty({
    example: '2025-12-01',
    description: 'Дата для поиска событий (YYYY-MM-DD)',
  })
  @IsDateString()
  date: string;
}
