import { Test, TestingModule } from '@nestjs/testing';

import { BlogCategoryController } from './blogCategory.controller';
import { BlogCategoryService } from './blogCategory.service';
import blogCategoriesMock from './blogCategory.mock.json';

describe('BlogPostController', () => {
  let appController: BlogCategoryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlogCategoryController],
      providers: [BlogCategoryService],
    }).compile();

    appController = app.get<BlogCategoryController>(BlogCategoryController);
  });

  describe('root', () => {
    it('should return categories', () => {
      expect(appController.getAll()).toEqual(blogCategoriesMock.categories);
    });
  });
});
