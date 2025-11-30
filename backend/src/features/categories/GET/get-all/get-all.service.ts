import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../../../entities/category.entity';
import { GetAllCategoriesQueryDto } from './get-all.query.dto';
import { GetAllCategoriesResponseDto } from './get-all.response.dto';

@Injectable()
export class GetAllCategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async execute(
    query: GetAllCategoriesQueryDto,
  ): Promise<GetAllCategoriesResponseDto> {
    const limit = query.limit || 50;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const [categories, total] = await this.categoryRepository.findAndCount({
      take: limit,
      skip,
      order: {
        name: 'ASC',
      },
    });

    return new GetAllCategoriesResponseDto(categories, total, page, limit);
  }
}
