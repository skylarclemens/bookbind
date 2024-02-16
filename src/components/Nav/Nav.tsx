import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import style from './nav.module.css';
import { IoMenu, IoSearch } from 'react-icons/io5';
import { useState } from 'react';

const Nav = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className={style.container}>
      <div className={style.navLeft}>
        <IoMenu className={style.menuButton} onClick={() => setShowMenu(!showMenu)} />
        <Link to={'/'} className={style.logo}>Bookbind</Link>
        <div className={style.menu}>
          <Link to={''}>Library</Link>
        </div>
      </div>
      <IoSearch className={style.searchButton} onClick={() => setShowSearch(!showSearch)}/>
      <div className={`${style.searchbar} ${showSearch ? style.show : ''}`}>
        <Search />
      </div>
    </div>
  )
}

export default Nav;