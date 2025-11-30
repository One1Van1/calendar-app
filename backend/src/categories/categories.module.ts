import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Event } from '../entities/event.entity';

// GET controllers
import { GetAllCategoriesController } from '../features/categories/GET/get-all/get-all.controller';
import { GetByIdCategoryController } from '../features/categories/GET/get-by-id/get-by-id.controller';

// POST controllers
import { CreateCategoryController } from '../features/categories/POST/create-category/create-category.controller';

// PUT controllers
import { UpdateCategoryController } from '../features/categories/PUT/update-category/update-category.controller';

// DELETE controllers
import { DeleteCategoryController } from '../features/categories/DELETE/delete-category/delete-category.controller';

// GET services
import { GetAllCategoriesService } from '../features/categories/GET/get-all/get-all.service';
import { GetByIdCategoryService } from '../features/categories/GET/get-by-id/get-by-id.service';

// POST services
import { CreateCategoryService } from '../features/categories/POST/create-category/create-category.service';

// PUT services
import { UpdateCategoryService } from '../features/categories/PUT/update-category/update-category.service';

// DELETE services
import { DeleteCategoryService } from '../features/categories/DELETE/delete-category/delete-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Event])],
  controllers: [
    GetAllCategoriesController,
    GetByIdCategoryController,
    CreateCategoryController,
    UpdateCategoryController,
    DeleteCategoryController,
  ],
  providers: [
    GetAllCategoriesService,
    GetByIdCategoryService,
    CreateCategoryService,
    UpdateCategoryService,
    DeleteCategoryService,
  ],
})
export class CategoriesModule {}
