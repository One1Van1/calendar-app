import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetByIdEventService } from './get-by-id.service';
import { GetByIdEventResponseDto } from './get-by-id.response.dto';
import { ApiGetByIdEvent } from './openapi.decorator';

@Controller('events')
@ApiTags('GetEventById')
export class GetByIdEventController {
  constructor(private readonly service: GetByIdEventService) {}

  @Get(':id')
  @ApiGetByIdEvent()
  async handle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetByIdEventResponseDto> {
    const event = await this.service.execute(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }
}
