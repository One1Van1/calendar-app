import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetPendingRemindersService } from './get-pending.service';
import { GetPendingRemindersResponseDto } from './get-pending.response.dto';
import { ApiGetPendingReminders } from './openapi.decorator';

@Controller('reminders')
@ApiTags('GetPendingReminders')
export class GetPendingRemindersController {
  constructor(private readonly service: GetPendingRemindersService) {}

  @Get('pending')
  @ApiGetPendingReminders()
  async handle(): Promise<GetPendingRemindersResponseDto> {
    return this.service.execute();
  }
}
