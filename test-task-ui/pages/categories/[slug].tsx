import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { NEXT_PUBLIC_API_URL } from '../../constants/env';
import { IBlogCategory } from '../../types/blogCategory';
import { IBlogPost } from '../../types/blogPost';
import { WithPagination } from '../../types/pagination';

import HomePageContainer from '../../components/HomePageContainer';

interface IHomePageContainerProps {
  categories?: Array<IBlogCategory>;
  blogPosts?: WithPagination<Array<IBlogPost>>;
}

const Categories: React.FC<IHomePageContainerProps> = ({
  categories,
  blogPosts,
}) => {
  return (
    <HomePageContainer categories={categories} blogPosts={blogPosts}/>
  )
}

export default Categories;

export const getStaticProps: GetStaticProps<IHomePageContainerProps> = async (context) => {
  const slug = context?.params?.slug;
  const [blogPosts, categories] = await Promise.all([
    fetch(`${NEXT_PUBLIC_API_URL}/blogPosts/getAllByCategory/${slug}`).then(response => response.json()),
    fetch(`${NEXT_PUBLIC_API_URL}/blogCategories/getAll`).then(response => response.json()),
  ]);

  return {
    props: {
      blogPosts,
      categories,
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/blogCategories/getAll`);

  if (!response.ok) {
    return {
      paths: [],
      fallback: false,
    }
  }

  const categories: Array<IBlogCategory> = await response.json();
  const paths = categories
    .map(category => category.slug)
    .filter(category => !!category)
    .map(slug => ({
      params: { slug },
    }));

  return {
    paths,
    fallback: false,
  }
}
