export interface Book {
  id: string,
  title: string,
  subtitle: string,
  authors: string[],
  categories: string[],
  description: string,
  isbn: string[],
  type: string,
  images: {
    small: string,
    medium: string,
    large: string,
    smallThumbnail: string,
    thumbnail: string,
  }
  publishedDate: string,
  publisher: string,
  pageCount: number,
}

export interface User {
  id: string,
  username: string,
  displayName: string,
  avatarUrl?: string,
  email: string,
}