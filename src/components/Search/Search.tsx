import { useEffect, useRef, useState } from 'react';
import style from './search.module.css';
import useClickOut from '../../hooks/useClickOut';
import { Link } from 'react-router-dom';

export interface BookResult {
  id: string,
  volumeInfo: {
    authors: string[],
    categories: string[],
    description: string,
    imageLinks: {
      small: string,
      medium: string,
      large: string,
      smallThumbnail: string,
      thumbnail: string
    },
    printType: string,
    publishedDate: string,
    industryIdentifiers: string[],
    publisher: string,
    pageCount: number,
    subtitle: string,
    title: string
  }
}

const Search = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchData, setSearchData] = useState<BookResult[]>([]);
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

  const handleLinkClick = () => {
    setSearchText("");
    setSearchData([]);
  }

  return(
    <div className={style.container}>
      <input type="search" placeholder="Search" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <ul ref={searchResultsList} className={`${style.searchResults} ${searchData.length ? '' : style.empty}`}>
        {searchData.map((book: BookResult) => {
          const coverImage = book.volumeInfo?.imageLinks?.thumbnail;
          const listItem = book.volumeInfo.title ?
            <li key={book.id}>
              <Link onClick={handleLinkClick} to={`/book/${book.id}`}>
                <div className={style.bookItem}>
                  <div className={style.bookImageContainer}>
                    <img className={style.bookImage} src={coverImage} alt={`${book.volumeInfo.title} cover`} />
                  </div>
                  <div className={style.bookInfo}>
                    <span className={style.bookTitle}>{book.volumeInfo.title}</span>
                    <span className={style.bookAuthors}>{book.volumeInfo.authors}</span>
                  </div>
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