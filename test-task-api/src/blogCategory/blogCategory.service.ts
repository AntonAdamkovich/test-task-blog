import { Injectable } from '@nestjs/common';

import { IBlogCategory } from './blogCategory.types';
import { categories } from './blogCategory.mock.json';

@Injectable()
export class BlogCategoryService {
  getCategories(): Array<IBlogCategory> {
    return categories;
  }
  getCategoryBySlug(slug: string) {
    return categories.find((category) => category.slug === slug);
  }
}
