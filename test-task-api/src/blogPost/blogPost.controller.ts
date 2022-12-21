import { Controller, Get, Param, Query, Header } from '@nestjs/common';
import * as Pagination from 'pagination';

import { BlogPostService } from './blogPost.service';
import { BlogCategoryService } from '../blogCategory/blogCategory.service';

@Controller('blogPosts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService,
    private readonly blogCategoryService: BlogCategoryService,
  ) {}

  @Get('getAll')
  getAll(@Query('page') page: number | undefined) {
    const blogPosts = this.blogPostService.getBlogPosts();
    const paginationInfo = new Pagination.SearchPaginator({
      current: page || 1,
      rowsPerPage: 10,
      totalResult: blogPosts.length,
    });
    const paginationData = paginationInfo.getPaginationData();
    const currentPage = blogPosts.slice(
      paginationData.fromResult,
      paginationData.toResult,
    );

    return {
      data: currentPage,
      meta: paginationData,
    };
  }

  @Get('getAllByCategory/:slug')
  getAllByCategory(
    @Query('page') page: number | undefined,
    @Param('slug') slug: string | undefined,
  ) {
    const category = this.blogCategoryService.getCategoryBySlug(slug);
    const blogPosts = this.blogPostService.getBlogPostsByCategory(category.id);

    const paginationInfo = new Pagination.SearchPaginator({
      current: page || 1,
      rowsPerPage: 10,
      totalResult: blogPosts.length,
    });
    const paginationData = paginationInfo.getPaginationData();
    const currentPage = blogPosts.slice(
      paginationData.fromResult,
      paginationData.toResult,
    );

    return {
      data: currentPage,
      meta: paginationData,
    };
  }

  @Header('Access-Control-Allow-Origin', '*')
  @Get('getBlogPostByTitle')
  getByTitle(@Query('search') title: string | undefined) {
    return this.blogPostService.getBlogPostByTitle(title);
  }

  @Get('getAllSlugs')
  getAllSlugs() {
    return this.blogPostService.getSlugs();
  }

  @Get('getBlogPostBySlug/:slug')
  getBlogPostBySlug(@Param('slug') slug: string | undefined) {
    return this.blogPostService.getBlogPostBySlug(slug);
  }
}
