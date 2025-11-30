import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../../../entities/category.entity';
import { UpdateCategoryRequestDto } from './update-category.request.dto';
import { UpdateCategoryResponseDto } from './update-category.response.dto';

@Injectable()
export class UpdateCategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async execute(
    id: number,
    updateDto: UpdateCategoryRequestDto,
  ): Promise<UpdateCategoryResponseDto | null> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      return null;
    }

    if (updateDto.name !== undefined) category.name = updateDto.name;
    if (updateDto.color !== undefined) category.color = updateDto.color;

    const updatedCategory = await this.categoryRepository.save(category);

    return new UpdateCategoryResponseDto(updatedCategory);
  }
}
