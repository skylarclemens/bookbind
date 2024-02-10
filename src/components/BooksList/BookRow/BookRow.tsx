import { Link } from "react-router-dom";
import { Book } from "../../../data/definitions";
import style from './bookrow.module.css';

const BookRow = ({ book }: { book: Book }) => {
  return (
    <div className={style.container}>
      <Link to={`/books/${book.id}`}>
        <div className={style.coverContainer}>
          <img className={style.coverImage} src={book.images.thumbnail} alt={`${book.title} cover`} />
        </div>
        <div className={style.bookInfo}>
          <span className={style.bookTitle}>{book.title}</span>
          <span className={style.bookAuthors}>{book.authors}</span>
        </div>
      </Link>
    </div>
  )
}

export default BookRow;