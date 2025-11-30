import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetByEventRemindersService } from './get-by-event.service';
import { GetByEventRemindersResponseDto } from './get-by-event.response.dto';
import { ApiGetByEventReminders } from './openapi.decorator';

@Controller('reminders')
@ApiTags('GetRemindersByEvent')
export class GetByEventRemindersController {
  constructor(private readonly service: GetByEventRemindersService) {}

  @Get('event/:eventId')
  @ApiGetByEventReminders()
  async handle(
    @Param('eventId', ParseIntPipe) eventId: number,
  ): Promise<GetByEventRemindersResponseDto> {
    return this.service.execute(eventId);
  }
}
