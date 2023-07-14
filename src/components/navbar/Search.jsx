import { useContext } from 'react';
import { context } from '../../context/context';

const Search = () => {
  const { query, searchBook } = useContext(context);

  return (
    <div>
      <input
        type='text'
        name='search'
        id='search'
        placeholder='جستجو کنید'
        className='navbar-search'
        value={query.text}
        onChange={searchBook}
      />
    </div>
  );
};

export default Search;
