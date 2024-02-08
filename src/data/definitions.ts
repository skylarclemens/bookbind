export interface Book {
  id: string,
  title: string,
  subtitle: string,
  authors: string[],
  categories: string[],
  description: string,
  images: {
    thumbnail: string
  },
  publishedDate: string,
  publisher: string,
  pageCount: number
}