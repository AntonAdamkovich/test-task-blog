export interface IBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: Array<number>;
}
