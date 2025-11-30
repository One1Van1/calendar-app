import { ApiProperty } from '@nestjs/swagger';

export class DeleteEventResponseDto {
  @ApiProperty({
    example: true,
    description: 'Успешность операции',
  })
  success: boolean;

  @ApiProperty({
    example: 'Event deleted successfully',
    description: 'Сообщение',
  })
  message: string;

  @ApiProperty({
    example: 1,
    description: 'ID удалённого события',
  })
  deletedId: number;

  constructor(id: number) {
    this.success = true;
    this.message = 'Event deleted successfully';
    this.deletedId = id;
  }
}
