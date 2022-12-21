import React from 'react';
import Link from 'next/link';

import { IBlogPost } from '../../types/blogPost';
import { IBlogCategory } from '../../types/blogCategory';

export interface IBlogPostCardProps {
  blogPost: IBlogPost;
  categories: Array<IBlogCategory>;
}

const BlogPostCard: React.FC<IBlogPostCardProps> = ({
  blogPost,
  categories
}) => {
  const mappedCategories = blogPost.categories
    .map(categoryId => categories.find(category => category.id === categoryId))
    .filter(category => !!category)
    .map(category => category?.name)
    .join(', ');

  return (
    <div className="group relative hover:translate-y-12">
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={blogPost.imageUrl}
          alt="blog post image"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4">
        <p className="text-blue-700 text-sm">{mappedCategories}</p>
        <h3 className="text-sm text-black-900 font-bold">
          <Link href={`posts/${blogPost.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {blogPost.title}
          </Link>
        </h3>
        <p className="text-sm font-medium text-gray-900 mt-4">{blogPost.excerpt}</p>
      </div>
    </div>
  )
}

export default React.memo(BlogPostCard);
