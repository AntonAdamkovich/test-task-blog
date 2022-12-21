import React, { useCallback } from 'react';
import getConfig from 'next/config';
import Select from 'react-select';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

export interface IBlogPostSearchProps {}

const NEXT_PUBLIC_API_URL = getConfig().publicRuntimeConfig.NEXT_PUBLIC_API_URL;

export interface IOption {
  label: string;
  value: string;
}

const BlogPostSearch: React.FC<IBlogPostSearchProps> = () => {
  const router = useRouter();

  const mutation = useMutation<Array<IOption>, unknown, string | undefined>(search =>
    fetch(`${NEXT_PUBLIC_API_URL}/blogPosts/getBlogPostByTitle?search=${search}`).then(response => response.json()))

  const handleSelectChange = useCallback((value: IOption | null) => {
    router.push(`posts/${value?.value}`);
  }, [router]);

  const handleInputChange = useCallback((value: string | undefined) => mutation.mutate(value), [mutation]);

  return (
    <div className="w-48">
      <Select
        name="search"
        isSearchable
        isClearable
        isLoading={mutation.isLoading}
        onInputChange={handleInputChange}
        onChange={handleSelectChange}
        options={mutation.data}
      />
    </div>
  )
}

export default React.memo(BlogPostSearch);
