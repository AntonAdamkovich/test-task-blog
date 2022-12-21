import React from 'react';

import { IBlogCategory } from '../../types/blogCategory';
import { IBlogPost } from '../../types/blogPost';
import { WithPagination } from '../../types/pagination';

import Pagination from '../../components/Pagination';
import BlogPostCard from '../../components/BlogPostCard';
import Categories from '../../components/Categories';

interface IHomeProps {
  categories?: Array<IBlogCategory>;
  blogPosts?: WithPagination<Array<IBlogPost>>;
}

const HomePageContainer: React.FC<IHomeProps> = ({
  categories,
  blogPosts,
}) => {
  return (
    <>
      <Categories categories={categories || []}/>
      <main className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">From the blog</h2>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsa libero labore natus atque, ducimuse sed.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {blogPosts?.data?.map(blogPost => (
              <BlogPostCard blogPost={blogPost} key={blogPost.id} categories={categories || []}/>
            ))}
          </div>
          <Pagination meta={blogPosts?.meta} />
        </div>
      </main>
    </>
  )
}

export default HomePageContainer;
