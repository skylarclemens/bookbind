import { useEffect, useRef, useState } from 'react';
import { Book } from '../../data/definitions';
import style from './search.module.css';
import { useStore } from '../../data/useStore';
import useClickOut from '../../hooks/useClickOut';
import { Link } from 'react-router-dom';

export interface BookResult {
  id: string,
  volumeInfo: {
    authors: string[],
    categories: string[],
    description: string,
    imageLinks: {
      thumbnail: string
    },
    publishedDate: string,
    publisher: string,
    pageCount: number,
    subtitle: string,
    title: string
  }
}

const Search = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchData, setSearchData] = useState<BookResult[]>([]);
  const books = useStore((state) => state.books)
  const addBook = useStore((state) => state.addBook);
  const removeBook = useStore((state) => state.removeBook);
  const searchResultsList = useRef(null);
  useClickOut(searchResultsList, () => {
    setSearchData([]);
  })

  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = import.meta.env.VITE_GOOGLE_KEY;
  const inputTimer = 500;

  useEffect(() => {
    if (searchText.length) {

      const handleSearch = () => {
        fetch(`${baseUrl}?q=${searchText}&key=${apiKey}`)
          .then(res => res.json())
          .then(data => {
            setSearchData(data.items);
          });
      }

      const debouncer = setTimeout(() => {
        handleSearch();
      }, inputTimer);

      return () => clearTimeout(debouncer);
    } else {
      setSearchData([]);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const mapToBook = (bookResult: BookResult): Book => {
    const info = bookResult.volumeInfo;
    const book: Book = {
      id: bookResult.id,
      title: info.title,
      subtitle: info.subtitle,
      authors: info.authors,
      categories: info.categories,
      description: info.description,
      images: {
        thumbnail: info.imageLinks.thumbnail
      },
      publishedDate: info.publishedDate,
      publisher: info.publisher,
      pageCount: info.pageCount
    }
    return book;
  }

  return(
    <div className={style.container}>
      <input type="search" placeholder="Search" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <ul ref={searchResultsList} className={`${style.searchResults} ${searchData.length ? '' : style.empty}`}>
        {searchData.map((book: BookResult) => {
          const coverImage = book.volumeInfo?.imageLinks?.thumbnail;
          const listItem = book.volumeInfo.title ?
            <li key={book.id}>
              <Link to={`/book/${book.id}`}>
                <div className={style.bookItem}>
                  <div className={style.bookImageContainer}>
                    <img className={style.bookImage} src={coverImage} alt={`${book.volumeInfo.title} cover`} />
                  </div>
                  <div className={style.bookInfo}>
                    <span className={style.bookTitle}>{book.volumeInfo.title}</span>
                    <span className={style.bookAuthors}>{book.volumeInfo.authors}</span>
                  </div>
                  {books.length && books.findIndex(el => el.id === book.id) > -1 ?
                    (<button onClick={() => removeBook(mapToBook(book))}>Remove</button>) :
                    (<button onClick={() => addBook(mapToBook(book))}>Add</button>)
                  }
                </div>
              </Link>
            </li> : '';
            return listItem;
        })}
      </ul>
    </div>
  )
}

export default Search;