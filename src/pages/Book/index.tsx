import style from './book.module.css';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookResult } from '../../components/Search/Search';
import BookStatus from '../../components/BookStatus/BookStatus';
import { useStore } from '../../data/useStore';
import { Book, UserBook } from '../../data/definitions';
import { mapToBook } from '../../helpers/mapToBook';
import { IoBook, IoCalendar, IoNewspaper } from 'react-icons/io5';

const BookDetails = () => {
  const bookResult = useLoaderData() as BookResult;
  const [book, setBook] = useState<Book>();
  const [showDescriptionText, setShowDescriptionText] = useState<boolean>(false);
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
          <div className={style.descriptionContainer}>
            <h3 className="subheadline">Description</h3>
            <div className={`${style.description} ${!showDescriptionText && style.descriptionOverlay}`}>
              <div className="body" dangerouslySetInnerHTML={{ __html: book.description as string}}></div>
              <button className={style.showDescription} onClick={() => setShowDescriptionText(!showDescriptionText)}>Show {`${showDescriptionText ? 'less' : 'more'}`}</button>
            </div>
          </div>
          <div className={style.detailsContainer}>
            <h3 className="subheadline">Details</h3>
            <div className={style.details}>
              <div className={style.detail}>
                <div className={style.detailType}>
                  <div className={style.detailIcon}><IoBook /></div>
                  Pages
                </div>
                <span>{book.pageCount}</span>
              </div>
              <div className={style.detail}>
                <div className={style.detailType}>
                  <div className={style.detailIcon}><IoCalendar /></div>
                  Released
                </div>
                <span>{book.publishedDate}</span>
              </div>
              <div className={style.detail}>
                <div className={style.detailType}>
                  <div className={style.detailIcon}><IoNewspaper /></div>
                  Publisher
                </div>
                <span>{book.publisher}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails;