import Nav from "../../components/Nav/Nav";
import BooksList from "../../components/BooksList/BooksList";
import style from './home.module.css';

const Home = () => {
  return(
      <div className={style.container}>
        <Nav />
        <BooksList />
      </div>
  )
}

export default Home;