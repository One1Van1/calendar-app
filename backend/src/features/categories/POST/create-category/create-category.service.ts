import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../../../entities/category.entity';
import { CreateCategoryRequestDto } from './create-category.request.dto';
import { CreateCategoryResponseDto } from './create-category.response.dto';

@Injectable()
export class CreateCategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async execute(
    createDto: CreateCategoryRequestDto,
  ): Promise<CreateCategoryResponseDto> {
    const category = this.categoryRepository.create({
      name: createDto.name,
      color: createDto.color,
    });

    const savedCategory = await this.categoryRepository.save(category);

    return new CreateCategoryResponseDto(savedCategory);
  }
}
