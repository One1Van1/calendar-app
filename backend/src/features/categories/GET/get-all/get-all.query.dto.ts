import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllCategoriesQueryDto {
  @ApiProperty({
    example: 50,
    description: 'Количество категорий на странице',
    required: false,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @ApiProperty({
    example: 1,
    description: 'Номер страницы',
    required: false,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;
}
