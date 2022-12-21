import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';

import { NEXT_PUBLIC_API_URL } from '../../constants/env';
import { IBlogPost } from '../../types/blogPost';
import { IBlogCategory } from '../../types/blogCategory';

interface IBlogPostProps {
  details?: IBlogPost;
  categories: string;
}

const BlogPost: React.FC<IBlogPostProps> = ({
  details,
  categories
}) => {
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <Link href="/" className="mr-2 text-sm font-medium text-gray-900">Home</Link>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <Link
                href={`posts/${details?.slug}`}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {details?.title}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={details?.imageUrl}
              alt="blog post image"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2">
            <p className="text-blue-700 text-sm">{categories}</p>
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{details?.title}</h1>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{details?.excerpt}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost;

export const getStaticProps: GetStaticProps<IBlogPostProps> = async (context) => {
  const slug = context.params?.slug;

  if (!slug) {
    return { notFound: true };
  }

  const [
    details,
    allCategories,
  ] = await Promise.all([
    fetch(`${NEXT_PUBLIC_API_URL}/blogPosts/getBlogPostBySlug/${slug}`).then(response => response.json()),
    fetch(`${NEXT_PUBLIC_API_URL}/blogCategories/getAll`).then(response => response.json()),
  ]);

  const categories = (details.categories as Array<number>)
    .map(categoryId => allCategories.find((category: IBlogCategory) => category.id === categoryId))
    .filter(category => !!category)
    .map(category => category?.name)
    .join(', ');

  return {
    props: {
      details,
      categories,
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/blogPosts/getAllSlugs`);

  if (!response.ok) {
    throw new Error('cannot fetch slugs');
  }

  const slugs: Array<string> = await response.json();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  }
}

