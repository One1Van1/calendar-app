import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllEventsQueryDto {
  @ApiProperty({
    example: 10,
    description: 'Количество элементов на странице',
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({
    example: 1,
    description: 'Номер страницы',
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    example: 1,
    description: 'ID категории для фильтрации',
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  categoryId?: number;
}
