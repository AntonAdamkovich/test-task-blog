import { Module } from '@nestjs/common';

import { BlogPostController } from './blogPost/blogPost.controller';
import { BlogPostService } from './blogPost/blogPost.service';

import { BlogCategoryController } from './blogCategory/blogCategory.controller';
import { BlogCategoryService } from './blogCategory/blogCategory.service';

@Module({
  imports: [],
  controllers: [BlogPostController, BlogCategoryController],
  providers: [BlogPostService, BlogCategoryService],
})
export class AppModule {}
