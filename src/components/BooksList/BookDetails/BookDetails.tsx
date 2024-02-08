import { Book } from "../../../data/definitions";
import style from './bookdetails.module.css';

const BookDetails = ({ book }: { book: Book }) => {
  return (
    <div className={style.container}>
      <div className={style.coverContainer}>
        <img className={style.coverImage} src={book.images.thumbnail} alt={`${book.title} cover`} />
      </div>
      <div className={style.bookInfo}>
        <span className={style.bookTitle}>{book.title}</span>
        <span className={style.bookAuthors}>{book.authors}</span>
      </div>
    </div>
  )
}

export default BookDetails;