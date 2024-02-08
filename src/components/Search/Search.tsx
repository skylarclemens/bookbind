import { useEffect, useState } from 'react';
import style from './search.module.css';

interface BookResult {
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
  }, [searchText])

  return(
    <div className={style.container}>
      <input type="search" placeholder="Search" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <ul className={`${style.searchResults} ${searchData.length ? '' : style.empty}`}>
        {searchData.map((book: BookResult) => {
          const coverImage = book.volumeInfo?.imageLinks?.thumbnail;
          const listItem = book.volumeInfo.title ?
            <li key={book.id}>
              <div className={style.bookItem}>
                <div className={style.bookImageContainer}>
                  <img className={style.bookImage} src={coverImage} alt={`${book.volumeInfo.title} cover`} />
                </div>
                <div className={style.bookInfo}>
                  <span className={style.bookTitle}>{book.volumeInfo.title}</span>
                  <span className={style.bookAuthors}>{book.volumeInfo.authors}</span>
                </div>
              </div>
            </li> : '';
            return listItem;
        })}
      </ul>
    </div>
  )
}

export default Search;