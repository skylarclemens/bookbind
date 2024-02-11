import style from './book.module.css';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookResult } from '../../components/Search/Search';
import { useStore, useUserStore } from '../../data/useStore';
import { Book, UserBook } from '../../data/definitions';
import { mapToBook } from '../../helpers/mapToBook';
import { addBookToDb, removeBookFromDb } from '../../services/bookService';

const BookDetails = () => {
  const bookResult = useLoaderData() as BookResult;
  const [book, setBook] = useState<Book>();
  const [userBookInfo, setUserBookInfo] = useState<UserBook>();
  const books = useStore((state) => state.books);
  const addBook = useStore((state) => state.addBook);
  const removeBook = useStore((state) => state.removeBook);
  const user = useUserStore((state) => state.user);

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

  const addCurrentBook = async (book: Book) => {
    if (user) {
      const newUserBook: UserBook = await addBookToDb(book, user.id);
      addBook(newUserBook);
    }
  }

  const removeCurrentBook = (userBook?: UserBook) => {
    if (user && userBook) {
      removeBookFromDb(userBook.book.id);
      removeBook(userBook);
    }
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
          {userBookInfo ?
            (<button className="cta" onClick={() => removeCurrentBook(userBookInfo)}>Remove</button>) :
            (<button className="cta" onClick={() => addCurrentBook(book)}>Add</button>)
          }
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