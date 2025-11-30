import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReminderService } from './create-reminder.service';
import { CreateReminderRequestDto } from './create-reminder.request.dto';
import { CreateReminderResponseDto } from './create-reminder.response.dto';
import { ApiCreateReminder } from './openapi.decorator';

@Controller('reminders')
@ApiTags('CreateReminder')
export class CreateReminderController {
  constructor(private readonly service: CreateReminderService) {}

  @Post()
  @ApiCreateReminder()
  async handle(
    @Body() createDto: CreateReminderRequestDto,
  ): Promise<CreateReminderResponseDto> {
    return this.service.execute(createDto);
  }
}
