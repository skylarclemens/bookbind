import style from './book.module.css';
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { BookResult } from '../../components/Search/Search';

const BookDetails = () => {
  const book = useLoaderData() as BookResult;

  useEffect(() => {
    console.log('test');
    console.log(book);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={style.container}>
      <span>Book</span>
      <span>{book.volumeInfo.title}</span>
    </div>
  )
}

export default BookDetails;