import { Controller, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateChecklistService } from './update-checklist.service';
import { UpdateChecklistDto } from './update-checklist.dto';
import { SingleDayEventResponseDto } from '../../POST/create/create.response.dto';

@Controller('single-day-events')
@ApiTags('SingleDayEvents')
export class UpdateChecklistController {
  constructor(private readonly service: UpdateChecklistService) {}

  @Put(':id/checklist')
  @ApiOperation({ summary: 'Обновить чек-лист события' })
  @ApiResponse({ status: 200, type: SingleDayEventResponseDto })
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateChecklistDto,
  ): Promise<SingleDayEventResponseDto> {
    return this.service.execute(id, dto);
  }
}
