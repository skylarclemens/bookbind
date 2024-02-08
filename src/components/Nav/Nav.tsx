import { Link } from 'react-router-dom';
import style from './nav.module.css';

const Nav = () => {
  return (
    <div className={style.container}>
      <Link to={'/'} className={style.logo}>Bookbind</Link>
      <div>
        <Link to={''}>Library</Link>
      </div>
    </div>
  )
}

export default Nav;