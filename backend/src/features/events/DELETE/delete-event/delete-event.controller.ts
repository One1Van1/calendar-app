import { Controller, Delete, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteEventService } from './delete-event.service';
import { DeleteEventResponseDto } from './delete-event.response.dto';
import { ApiDeleteEvent } from './openapi.decorator';

@Controller('events')
@ApiTags('DeleteEvent')
export class DeleteEventController {
  constructor(private readonly service: DeleteEventService) {}

  @Delete(':id')
  @ApiDeleteEvent()
  async handle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteEventResponseDto> {
    const result = await this.service.execute(id);
    if (!result) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return result;
  }
}
