import { Controller, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetByIdCategoryService } from './get-by-id.service';
import { GetByIdCategoryResponseDto } from './get-by-id.response.dto';
import { ApiGetByIdCategory } from './openapi.decorator';

@Controller('categories')
@ApiTags('GetCategoryById')
export class GetByIdCategoryController {
  constructor(private readonly service: GetByIdCategoryService) {}

  @Get(':id')
  @ApiGetByIdCategory()
  async handle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetByIdCategoryResponseDto> {
    const category = await this.service.execute(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
}
