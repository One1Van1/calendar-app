import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryService } from './create-category.service';
import { CreateCategoryRequestDto } from './create-category.request.dto';
import { CreateCategoryResponseDto } from './create-category.response.dto';
import { ApiCreateCategory } from './openapi.decorator';

@Controller('categories')
@ApiTags('CreateCategory')
export class CreateCategoryController {
  constructor(private readonly service: CreateCategoryService) {}

  @Post()
  @ApiCreateCategory()
  async handle(
    @Body() createDto: CreateCategoryRequestDto,
  ): Promise<CreateCategoryResponseDto> {
    return this.service.execute(createDto);
  }
}
