import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetByRangeEventsService } from './get-by-range.service';
import { GetByRangeQueryDto } from './get-by-range.query.dto';
import { GetByRangeResponseDto } from './get-by-range.response.dto';
import { ApiGetByRangeEvents } from './openapi.decorator';

@Controller('events')
@ApiTags('GetEventsByRange')
export class GetByRangeEventsController {
  constructor(private readonly service: GetByRangeEventsService) {}

  @Get('range')
  @ApiGetByRangeEvents()
  async handle(
    @Query() query: GetByRangeQueryDto,
  ): Promise<GetByRangeResponseDto> {
    return this.service.execute(query);
  }
}
