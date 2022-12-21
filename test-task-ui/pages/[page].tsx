import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { NEXT_PUBLIC_API_URL } from '../constants/env';
import { IBlogCategory } from '../types/blogCategory';
import { IBlogPost } from '../types/blogPost';
import { WithPagination } from '../types/pagination';

import HomePageContainer from '../components/HomePageContainer';

interface IHomeProps {
  categories?: Array<IBlogCategory>;
  blogPosts?: WithPagination<Array<IBlogPost>>;
}

const Home: React.FC<IHomeProps> = ({
  categories,
  blogPosts,
}) => {
  return (
    <HomePageContainer categories={categories} blogPosts={blogPosts}/>
  )
}

export default Home;

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const page = context?.params?.page;
  const [blogPosts, categories] = await Promise.all([
    fetch(`${NEXT_PUBLIC_API_URL}/blogPosts/getAll?page=${page}`).then(response => response.json()),
    fetch(`${NEXT_PUBLIC_API_URL}/blogCategories/getAll`).then(response => response.json()),
  ]);

  return {
    props: {
      blogPosts,
      categories,
    },
  };
}

export const getStaticPaths: GetStaticPaths<{ page: string }> = async () => {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/blogPosts/getAll?page=1`);

  if (!response.ok) {
    return {
      paths: [],
      fallback: false,
    };
  }

  const firstPage: IHomeProps['blogPosts'] = await response.json();
  const paths = (firstPage?.meta?.range || [])
    .map((page) => ({
      params: { page: page.toString() },
    }));

  return {
    paths,
    fallback: false,
  }
}
