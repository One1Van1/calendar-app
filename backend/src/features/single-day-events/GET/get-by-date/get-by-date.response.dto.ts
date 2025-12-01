import { ApiProperty } from '@nestjs/swagger';
import { SingleDayEventResponseDto } from '../../POST/create/create.response.dto';

export class GetByDateResponseDto {
  @ApiProperty({ type: [SingleDayEventResponseDto] })
  events: SingleDayEventResponseDto[];

  @ApiProperty({ example: 5 })
  total: number;

  @ApiProperty({ example: '2025-12-01' })
  date: string;
}
