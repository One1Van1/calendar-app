import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Matches } from 'class-validator';

export class CreateCategoryRequestDto {
  @ApiProperty({
    example: 'Работа',
    description: 'Название категории',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: '#FF5733',
    description: 'Цвет категории в формате HEX (#RRGGBB)',
  })
  @IsString()
  @Matches(/^#[0-9A-F]{6}$/i, {
    message: 'Color must be in HEX format (#RRGGBB)',
  })
  color: string;
}
