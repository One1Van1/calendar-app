import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ChecklistItemResponseDto {
  @ApiProperty({ example: 'uuid-v4' })
  id: string;

  @ApiProperty({ example: 'Подготовить документы' })
  text: string;

  @ApiProperty({ example: false })
  completed: boolean;
}

export class SingleDayEventResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Встреча с клиентом' })
  name: string;

  @ApiPropertyOptional({ example: 'Обсудить условия контракта' })
  description?: string;

  @ApiProperty({ example: '2025-12-01' })
  startDay: string;

  @ApiProperty({ example: '2025-12-01' })
  endDay: string;

  @ApiPropertyOptional({ example: '09:00' })
  startTime?: string;

  @ApiPropertyOptional({ example: '10:00' })
  endTime?: string;

  @ApiPropertyOptional({ example: 1 })
  categoryId?: number;

  @ApiPropertyOptional({ type: [ChecklistItemResponseDto] })
  checklist?: ChecklistItemResponseDto[];

  @ApiPropertyOptional({ example: 50, description: 'Прогресс выполнения (0-100%)' })
  progress?: number;

  @ApiProperty({ example: '2025-11-30T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-11-30T10:00:00.000Z' })
  updatedAt: Date;
}
