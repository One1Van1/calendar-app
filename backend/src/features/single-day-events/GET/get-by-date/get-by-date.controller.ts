import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetByDateService } from './get-by-date.service';
import { GetByDateQueryDto } from './get-by-date.query.dto';
import { GetByDateResponseDto } from './get-by-date.response.dto';

@Controller('single-day-events')
@ApiTags('SingleDayEvents')
export class GetByDateController {
  constructor(private readonly service: GetByDateService) {}

  @Get()
  @ApiOperation({ summary: 'Получить события по дате' })
  @ApiResponse({ status: 200, type: GetByDateResponseDto })
  async handle(@Query() query: GetByDateQueryDto): Promise<GetByDateResponseDto> {
    return this.service.execute(query);
  }
}
