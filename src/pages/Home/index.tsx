import BooksList from "../../components/BooksList/BooksList";
import style from './home.module.css';

const Home = () => {
  return(
      <div className={style.container}>
        <BooksList />
      </div>
  )
}

export default Home;