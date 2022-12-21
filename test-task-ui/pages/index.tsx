import React from 'react';
import { GetStaticProps } from 'next';

import { NEXT_PUBLIC_API_URL } from '../constants/env';
import { IBlogCategory } from '../types/blogCategory';
import { IBlogPost } from '../types/blogPost';
import { WithPagination } from '../types/pagination';

import HomePageContainer from '../components/HomePageContainer';

interface IHomePageContainerProps {
  categories?: Array<IBlogCategory>;
  blogPosts?: WithPagination<Array<IBlogPost>>;
}

const Home: React.FC<IHomePageContainerProps> = ({
  categories,
  blogPosts,
}) => {
  return (
    <HomePageContainer categories={categories} blogPosts={blogPosts}/>
  )
}

export default Home;

export const getStaticProps: GetStaticProps<IHomePageContainerProps> = async (context) => {
  const [blogPosts, categories] = await Promise.all([
    fetch(`${NEXT_PUBLIC_API_URL}/blogPosts/getAll`).then(response => response.json()),
    fetch(`${NEXT_PUBLIC_API_URL}/blogCategories/getAll`).then(response => response.json()),
  ]);

  return {
    props: {
      blogPosts,
      categories,
    },
  };
}
