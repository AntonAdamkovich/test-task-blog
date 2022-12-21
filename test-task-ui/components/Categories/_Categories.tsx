import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import BlogPostSearch from '../BlogPostSearch';
import { IBlogCategory } from '../../types/blogCategory';

interface ICategoriesProps {
 categories: Array<IBlogCategory>;
}

const Categories: React.FC<ICategoriesProps> = ({
  categories,
}) => {
  const router = useRouter();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`categories/${category.slug}`}
                    className={
                      router.query.slug === category.slug
                        ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                    }
                    aria-current={router.query.slug === category.slug ? "page" : undefined}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <BlogPostSearch/>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`categories/${category.slug}`}
              className={
                router.query.slug === category.slug
                  ? 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
              }
              aria-current={router.query.slug === category.slug ? "page" : undefined}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default React.memo(Categories);
