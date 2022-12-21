import { Injectable } from '@nestjs/common';

import { IBlogPost } from './blogPost.types';
import { posts } from './blogPost.mock.json';

@Injectable()
export class BlogPostService {
  getBlogPosts(): Array<IBlogPost> {
    return posts;
  }
  getSlugs(): Array<string> {
    return this.getBlogPosts().map((blog) => blog.slug);
  }
  getBlogPostBySlug(slug: string) {
    return posts.find((post) => post.slug === slug);
  }
  getBlogPostsByCategory(categoryId: number) {
    return posts.filter((post) => post.categories?.includes(categoryId));
  }
  getBlogPostByTitle(title: string) {
    return posts
      .filter((post) => post.title.includes(title))
      .map((post) => ({
        label: post.title,
        value: post.slug,
      }));
  }
}
