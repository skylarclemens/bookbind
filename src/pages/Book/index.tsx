import style from './book.module.css';
import { useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookResult } from '../../components/Search/Search';
import { useStore } from '../../data/useStore';
import { Book } from '../../data/definitions';
import { mapToBook } from '../../helpers/mapToBook';

const BookDetails = () => {
  const bookResult = useLoaderData() as BookResult;
  const [book, setBook] = useState<Book>();
  const books = useStore((state) => state.books);
  const addBook = useStore((state) => state.addBook);
  const removeBook = useStore((state) => state.removeBook);

  useEffect(() => {
    setBook(mapToBook(bookResult));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookResult]);

  return (
    <div className={style.container}>
      <div className={style.bookDetails}>
        <div className={style.detailsLeft}>
          <div className={style.coverContainer}>
            <img className={style.cover} src={book?.images.thumbnail} alt={`${book?.title} book cover`} />
          </div>
          {books.length && books.findIndex(el => el.id === book?.id) > -1 ?
            (<button className="cta" onClick={() => removeBook(book as Book)}>Remove</button>) :
            (<button className="cta" onClick={() => addBook(book as Book)}>Add</button>)
          }
        </div>
        <div className={style.detailsRight}>
          <div className={style.title}>
            <h1>{book?.title}</h1>
            <h2>{book?.authors}</h2>
          </div>
          <div className={style.description}>
            <h3 className="subheadline">Description</h3>
            <div className="body" dangerouslySetInnerHTML={{ __html: book?.description as string}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails;