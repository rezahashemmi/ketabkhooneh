import { Link, useLocation } from 'react-router-dom';
import Search from './Search';
import './navbar.css';

const Navbar = ({ bookQuery, searchBook }) => {
  const location = useLocation();

  return (
    <nav className='navbar'>
      <ul className='navbar-list' id='list'>
        <Link className='navbar-link' to='https://porza.ir'>
          <li className='navbar-item logo'>PORZA</li>
        </Link>
        <Link className='navbar-link' to='/'>
          <li className='navbar-item'>کتابخونه</li>
        </Link>
      </ul>
      {location.pathname === '/books' ? (
        <Search query={bookQuery} search={searchBook} />
      ) : null}
    </nav>
  );
};

export default Navbar;
