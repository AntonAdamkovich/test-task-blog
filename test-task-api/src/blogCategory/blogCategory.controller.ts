import { Controller, Get } from '@nestjs/common';

import { BlogCategoryService } from './blogCategory.service';

@Controller('blogCategories')
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {}

  @Get('getAll')
  getAll() {
    return this.blogCategoryService.getCategories();
  }
}
