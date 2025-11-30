import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../../../entities/category.entity';
import { DeleteCategoryResponseDto } from './delete-category.response.dto';

@Injectable()
export class DeleteCategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async execute(id: number): Promise<DeleteCategoryResponseDto | null> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      return null;
    }

    await this.categoryRepository.remove(category);

    return new DeleteCategoryResponseDto(id);
  }
}
