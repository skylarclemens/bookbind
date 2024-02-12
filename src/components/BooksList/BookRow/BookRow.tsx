import { Link } from "react-router-dom";
import { Book } from "../../../data/definitions";
import style from './bookrow.module.css';

const BookRow = ({ book }: { book: Book }) => {
  return (
    <Link to={`/book/${book.google_id}`}>
      <div className={style.container}>
          <div className={style.coverContainer}>
            <img className={style.coverImage} src={book.images.thumbnail} alt={`${book.title} cover`} />
          </div>
          <div className={style.bookInfo}>
            <span className={style.bookTitle}>{book.title}</span>
            <span className={style.bookAuthors}>{book.authors}</span>
          </div>
      </div>
    </Link>
  )
}

export default BookRow;