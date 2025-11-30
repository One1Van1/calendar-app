import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllEventsService } from './get-all.service';
import { GetAllEventsQueryDto } from './get-all.query.dto';
import { GetAllEventsResponseDto } from './get-all.response.dto';
import { ApiGetAllEvents } from './openapi.decorator';

@Controller('events')
@ApiTags('GetAllEvents')
export class GetAllEventsController {
  constructor(private readonly service: GetAllEventsService) {}

  @Get()
  @ApiGetAllEvents()
  async handle(
    @Query() query: GetAllEventsQueryDto,
  ): Promise<GetAllEventsResponseDto> {
    return this.service.execute(query);
  }
}
