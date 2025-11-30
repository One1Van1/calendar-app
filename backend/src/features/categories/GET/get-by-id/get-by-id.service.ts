import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../../../entities/category.entity';
import { GetByIdCategoryResponseDto } from './get-by-id.response.dto';

@Injectable()
export class GetByIdCategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async execute(id: number): Promise<GetByIdCategoryResponseDto | null> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['events'],
    });

    if (!category) {
      return null;
    }

    return new GetByIdCategoryResponseDto(category);
  }
}
