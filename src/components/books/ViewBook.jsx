/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Loading } from '../index';

import { getBook } from '../../services/services';
import { context } from '../../context/context';

const ViewBook = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({});
  const { loading, setLoading, deleteBook } = useContext(context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getBook(bookId);
        setLoading(false);
        setBook(data);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='view-book-container'>
          <img
            className='view-image'
            src={book.bookCover}
            alt={book.bookName}
          />
          <ul className='view-book-list'>
            <li className='view-book-item'>
              کتاب: {'  '}
              <span>{book.bookName}</span>
            </li>
            <li className='view-book-item'>
              نویسنده: {'  '}
              <span>{book.bookAuthor}</span>
            </li>
            <li className='view-book-item'>
              ناشر: {'  '}
              <span>{book.bookPublisher}</span>
            </li>
            <li className='view-book-item'>
              خلاصه کتاب: {'  '}
              <span>{book.bookAbstract}</span>
            </li>
            <li className='view-book-item'>
              <Link to='/books' className='btn btn-purple'>
                بازگشت
              </Link>
              {'  '}
              <Link to={`/books/edit/${book.id}`} className='btn btn-blue'>
                ویرایش
              </Link>
              {'  '}
              <button
                className='btn btn-red'
                onClick={() => deleteBook(bookId, book.bookName)}
              >
                حذف
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ViewBook;
