import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllRemindersService } from './get-all.service';
import { GetAllRemindersQueryDto } from './get-all.query.dto';
import { GetAllRemindersResponseDto } from './get-all.response.dto';
import { ApiGetAllReminders } from './openapi.decorator';

@Controller('reminders')
@ApiTags('GetAllReminders')
export class GetAllRemindersController {
  constructor(private readonly service: GetAllRemindersService) {}

  @Get()
  @ApiGetAllReminders()
  async handle(
    @Query() query: GetAllRemindersQueryDto,
  ): Promise<GetAllRemindersResponseDto> {
    return this.service.execute(query);
  }
}
