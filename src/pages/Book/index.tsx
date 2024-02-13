import style from './book.module.css';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookResult } from '../../components/Search/Search';
import BookStatus from '../../components/BookStatus/BookStatus';
import { useStore } from '../../data/useStore';
import { Book, UserBook } from '../../data/definitions';
import { mapToBook } from '../../helpers/mapToBook';

const BookDetails = () => {
  const bookResult = useLoaderData() as BookResult;
  const [book, setBook] = useState<Book>();
  const [userBookInfo, setUserBookInfo] = useState<UserBook>();
  const books = useStore((state) => state.books);

  useEffect(() => {
    setBook(mapToBook(bookResult));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookResult]);

  useEffect(() => {
    if (book) {
      const bookInfo = books.find((el) => {
        return el.book.google_id === book.id
      });
      if (bookInfo) {
        setUserBookInfo(bookInfo);
      } else {
        setUserBookInfo(undefined);
      }
    }
  }, [book, books]);

  if (!book) {
    return 'Loading...';
  }

  const formatCategories = (categories: string[]) => {
    const newCategories = categories.map((category) => {
      const str = category.split('/')
      return str[1].trim();
    });
    return newCategories;
  }

  return (
    <div className={style.container}>
      <div className={style.bookDetails}>
        <div className={style.detailsLeft}>
          <div className={style.coverContainer}>
            <img className={style.cover} src={book.images.thumbnail} alt={`${book.title} book cover`} />
          </div>
          <BookStatus userBook={userBookInfo} book={book} />
        </div>
        <div className={style.detailsRight}>
          <div className={style.title}>
            <h1>{book.title}</h1>
            <h2>{book.authors}</h2>
            <div className={style.categories}>
              {formatCategories(book.categories).map((category, i) => {
                return (<div className={style.category} key={`${category}-${i}`}>
                  {category}
                </div>)
              })}
            </div>
          </div>
          <div className={style.description}>
            <h3 className="subheadline">Description</h3>
            <div className="body" dangerouslySetInnerHTML={{ __html: book.description as string}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails;