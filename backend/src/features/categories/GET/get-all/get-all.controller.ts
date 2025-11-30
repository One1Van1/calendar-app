import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllCategoriesService } from './get-all.service';
import { GetAllCategoriesQueryDto } from './get-all.query.dto';
import { GetAllCategoriesResponseDto } from './get-all.response.dto';
import { ApiGetAllCategories } from './openapi.decorator';

@Controller('categories')
@ApiTags('GetAllCategories')
export class GetAllCategoriesController {
  constructor(private readonly service: GetAllCategoriesService) {}

  @Get()
  @ApiGetAllCategories()
  async handle(
    @Query() query: GetAllCategoriesQueryDto,
  ): Promise<GetAllCategoriesResponseDto> {
    return this.service.execute(query);
  }
}
