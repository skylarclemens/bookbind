import style from './bookslist.module.css';
import { useStore } from '../../data/useStore';
import { UserBook } from '../../data/definitions';
import BookRow from './BookRow/BookRow';

const BooksList = () => {
  const books = useStore((state) => state.books)

  return (
    <div className={style.container}>
      {books.map((userBook: UserBook) => {
        return <BookRow book={userBook.book} key={userBook.book_id} />
      })}
    </div>
  )
}

export default BooksList;