import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import style from './nav.module.css';

const Nav = () => {
  return (
    <div className={style.container}>
      <div className={style.navLeft}>
        <Link to={'/'} className={style.logo}>Bookbind</Link>
        <div>
          <Link to={''}>Library</Link>
        </div>
      </div>
      <Search />
    </div>
  )
}

export default Nav;