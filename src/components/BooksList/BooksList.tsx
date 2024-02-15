import style from './bookslist.module.css';
import { useStore } from '../../data/useStore';
import { UserBook } from '../../data/definitions';
import BookCard from './BookCard/BookCard';

const BooksList = () => {
  const books = useStore((state) => state.books)
  const statusList = [...new Set(books.map((book) => book.status))];
  const filterBooks = (status?: string): UserBook[] => {
    return books.filter(book => book.status === status);
  }

  return (
    <div className={style.container}>
      {statusList.map((status, id) => {
        const userBooks = filterBooks(status);
        return (
          <div className={style.statusContainer} key={id}>
            <div className={style.statusHeading}>
              <h2>{status}</h2>
              <div className={style.statusCount}>{userBooks.length}</div>
            </div>
            <div className={style.bookCardsList}>
              {userBooks.map((userBook) =>
                <BookCard book={userBook.book} status={userBook.status} key={userBook.book_id} />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BooksList;