import { BookResult } from "../components/Search/Search";
import { Book } from "../data/definitions";

export const mapToBook = (bookResult: BookResult): Book => {
  const info = bookResult.volumeInfo;
  const book: Book = {
    id: bookResult.id,
    title: info.title,
    subtitle: info.subtitle,
    authors: info.authors,
    categories: info.categories,
    description: info.description,
    images: {
      thumbnail: info.imageLinks.thumbnail
    },
    publishedDate: info.publishedDate,
    publisher: info.publisher,
    pageCount: info.pageCount
  }
  return book;
};