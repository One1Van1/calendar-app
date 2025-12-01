import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSingleDayEventService } from './create.service';
import { CreateSingleDayEventDto } from './create.dto';
import { SingleDayEventResponseDto } from './create.response.dto';
import { ApiCreateSingleDayEvent } from './openapi.decorator';

@Controller('single-day-events')
@ApiTags('SingleDayEvents')
export class CreateSingleDayEventController {
  constructor(private readonly service: CreateSingleDayEventService) {}

  @Post()
  @ApiCreateSingleDayEvent()
  async handle(@Body() dto: CreateSingleDayEventDto): Promise<SingleDayEventResponseDto> {
    return this.service.execute(dto);
  }
}
