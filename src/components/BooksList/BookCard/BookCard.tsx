import { Link } from "react-router-dom";
import { Book } from "../../../data/definitions";
import style from './bookcard.module.css';

const BookCard = ({ book, status }: { book: Book, status?: string }) => {
  const statusClassName = status === 'Reading' ? 'reading' : 'status';
  const cardBackground = status === 'Reading' ? 'url(' + book.images.thumbnail + ')' : '';
  return (
    <Link to={`/book/${book.google_id}`}>
      <div className={`${style.container} ${style[statusClassName]}`}>
        <div className={style.bgImage} style={{
          backgroundImage: cardBackground,
        }}></div>
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

export default BookCard;