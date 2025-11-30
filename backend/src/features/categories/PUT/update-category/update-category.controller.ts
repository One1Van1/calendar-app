import { Controller, Put, Param, ParseIntPipe, Body, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCategoryService } from './update-category.service';
import { UpdateCategoryRequestDto } from './update-category.request.dto';
import { UpdateCategoryResponseDto } from './update-category.response.dto';
import { ApiUpdateCategory } from './openapi.decorator';

@Controller('categories')
@ApiTags('UpdateCategory')
export class UpdateCategoryController {
  constructor(private readonly service: UpdateCategoryService) {}

  @Put(':id')
  @ApiUpdateCategory()
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCategoryRequestDto,
  ): Promise<UpdateCategoryResponseDto> {
    const category = await this.service.execute(id, updateDto);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
}
