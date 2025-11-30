import { ApiProperty } from '@nestjs/swagger';

export class DeleteReminderResponseDto {
  @ApiProperty({
    example: true,
    description: 'Успешность операции',
  })
  success: boolean;

  @ApiProperty({
    example: 'Reminder deleted successfully',
    description: 'Сообщение',
  })
  message: string;

  @ApiProperty({
    example: 1,
    description: 'ID удалённого напоминания',
  })
  deletedId: number;

  constructor(id: number) {
    this.success = true;
    this.message = 'Reminder deleted successfully';
    this.deletedId = id;
  }
}
