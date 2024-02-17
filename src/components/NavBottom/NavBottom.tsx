import style from './navbottom.module.css';
import { NavLink } from 'react-router-dom';
import { IoBook } from 'react-icons/io5';

const NavBottom = () => {
  return (
    <div className={style.container}>
      <NavLink
        to={'/'}
        className={({ isActive, isPending }) =>
          isActive ? `${style.navLink} ${style.active}` :
          isPending ? `${style.navLink} ${style.pending}` : `${style.navLink}`}>
        <div className={style.navButton}>
          <IoBook />
          <span className={style.label}>Library</span>
        </div>
      </NavLink>
    </div>
  )
}

export default NavBottom;