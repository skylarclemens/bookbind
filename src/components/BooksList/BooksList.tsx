import style from './bookslist.module.css';
import { useStore } from '../../data/useStore';
import { Book } from '../../data/definitions';
import BookDetails from './BookDetails/BookDetails';

const BooksList = () => {
  const books = useStore((state) => state.books)

  return (
    <div className={style.container}>
      {books.map((book: Book) => {
        return <BookDetails book={book} key={book.id} />
      })}
    </div>
  )
}

export default BooksList;