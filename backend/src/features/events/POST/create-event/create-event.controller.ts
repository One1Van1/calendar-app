import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEventService } from './create-event.service';
import { CreateEventRequestDto } from './create-event.request.dto';
import { CreateEventResponseDto } from './create-event.response.dto';
import { ApiCreateEvent } from './openapi.decorator';

@Controller('events')
@ApiTags('CreateEvent')
export class CreateEventController {
  constructor(private readonly service: CreateEventService) {}

  @Post()
  @ApiCreateEvent()
  async handle(
    @Body() createDto: CreateEventRequestDto,
  ): Promise<CreateEventResponseDto> {
    return this.service.execute(createDto);
  }
}
