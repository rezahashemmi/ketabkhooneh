import { useContext } from 'react';
import { Book, Loading, AddBook, NotFound } from '../index';
import { context } from '../../context/context';
import './books.css';

const Books = () => {
  const { loading, filtered } = useContext(context);

  return (
    <div className='books-wrapper'>
      <AddBook />
      <div className='books-container'>
        {loading ? (
          <Loading />
        ) : (
          <>
            {filtered.length > 0 ? (
              filtered.map((book) => <Book key={book.id} book={book} />)
            ) : (
              <NotFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Books;
