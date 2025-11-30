import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';

export class UpdateCategoryRequestDto {
  @ApiProperty({
    example: 'Работа (обновлено)',
    description: 'Название категории',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    example: '#33FF57',
    description: 'Цвет категории в формате HEX (#RRGGBB)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, {
    message: 'Color must be in HEX format (#RRGGBB)',
  })
  color?: string;
}
