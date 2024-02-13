import style from './bookstatus.module.css';
import { useState, useRef } from 'react';
import { Book, UserBook } from '../../data/definitions';
import { useStore, useUserStore } from '../../data/useStore';
import { addBookToDb, updateBookStatusDb, removeBookFromDb } from '../../services/bookService';
import useClickOut from '../../hooks/useClickOut';

const BookStatus = ({ userBook, book }: { userBook?: UserBook, book: Book }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const addBook = useStore((state) => state.addBook);
  const removeBook = useStore((state) => state.removeBook);
  const updateBook = useStore((state) => state.updateBook);
  const user = useUserStore((state) => state.user);
  const dropdownRef = useRef(null);
  useClickOut(dropdownRef, () => {
    setDropdownOpen(false);
  });

  const bookStatus = ['Want to read', 'Reading']

  const handleOpenClose = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const addCurrentBook = async (book: Book, status: string) => {
    if (user) {
      const newUserBook: UserBook = await addBookToDb(book, user.id, status);
      addBook(newUserBook);
      handleOpenClose();
    }
  }

  const updateCurrentBook = async (status: string, userBook: UserBook) => {
    if (user) {
      const retUserBook: UserBook = await updateBookStatusDb(userBook, status);
      updateBook(retUserBook);
    }
  }

  const handleBookStatus = async (status: string, userBook?: UserBook) => {
    if (userBook) {
      updateCurrentBook(status, userBook);
    } else {
      addCurrentBook(book, status);
    }
  }

  const removeCurrentBook = (userBook?: UserBook) => {
    if (user && userBook) {
      removeBookFromDb(userBook.book.id);
      removeBook(userBook);
      handleOpenClose();
    }
  }

  return (
    <div className={style.container}>
      <button className="cta" onClick={handleOpenClose}>
        {!userBook ? 'Add' : userBook.status}
      </button>
      {dropdownOpen ? (
        <ul ref={dropdownRef} className={style.dropdownContainer}>
          {bookStatus.map((status) => {
            return (
            <li key={status}>
              <button onClick={() => handleBookStatus(status, userBook)}>{status}</button>
           </li>
          )
          })}
          {userBook ? <li>
            <button onClick={() => removeCurrentBook(userBook)}>Remove</button>
          </li> : ''}
        </ul>
      ) : ''
      }
      
    </div>
  )
}

export default BookStatus;