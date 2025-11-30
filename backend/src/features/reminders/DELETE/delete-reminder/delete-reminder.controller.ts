import { Controller, Delete, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteReminderService } from './delete-reminder.service';
import { DeleteReminderResponseDto } from './delete-reminder.response.dto';
import { ApiDeleteReminder } from './openapi.decorator';

@Controller('reminders')
@ApiTags('DeleteReminder')
export class DeleteReminderController {
  constructor(private readonly service: DeleteReminderService) {}

  @Delete(':id')
  @ApiDeleteReminder()
  async handle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteReminderResponseDto> {
    const result = await this.service.execute(id);
    if (!result) {
      throw new NotFoundException(`Reminder with ID ${id} not found`);
    }
    return result;
  }
}
