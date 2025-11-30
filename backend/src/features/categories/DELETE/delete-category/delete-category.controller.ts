import { Controller, Delete, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteCategoryService } from './delete-category.service';
import { DeleteCategoryResponseDto } from './delete-category.response.dto';
import { ApiDeleteCategory } from './openapi.decorator';

@Controller('categories')
@ApiTags('DeleteCategory')
export class DeleteCategoryController {
  constructor(private readonly service: DeleteCategoryService) {}

  @Delete(':id')
  @ApiDeleteCategory()
  async handle(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteCategoryResponseDto> {
    const result = await this.service.execute(id);
    if (!result) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return result;
  }
}
