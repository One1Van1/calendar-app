import { Controller, Put, Param, ParseIntPipe, Body, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateEventService } from './update-event.service';
import { UpdateEventRequestDto } from './update-event.request.dto';
import { UpdateEventResponseDto } from './update-event.response.dto';
import { ApiUpdateEvent } from './openapi.decorator';

@Controller('events')
@ApiTags('UpdateEvent')
export class UpdateEventController {
  constructor(private readonly service: UpdateEventService) {}

  @Put(':id')
  @ApiUpdateEvent()
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEventRequestDto,
  ): Promise<UpdateEventResponseDto> {
    const event = await this.service.execute(id, updateDto);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }
}
