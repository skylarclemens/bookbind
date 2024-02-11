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
  google_id: string,
}

export interface User {
  id: string,
  username: string,
  displayName: string,
  avatarUrl?: string,
  email: string,
}

export interface UserBook {
  id: string,
  book: Book,
  book_id: string,
  user_id: string,
  start_date: Date,
  end_date?: Date,
  shelf?: string,
  status?: string,
  tags?: string[],
}