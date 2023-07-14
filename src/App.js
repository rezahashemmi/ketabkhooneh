import { useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';

import { Navbar, Books, ViewBook, EditBook, NewBook } from './components';

import { context } from './context/context';
import { getAllBooks, createBook, deleteBook } from './services/services';

import './App.css';

function App() {
  const [loading, setLoading] = useImmer(false);
  const [book, setBook] = useImmer({});
  const [books, setBooks] = useImmer([]);
  const [filtered, setFiltered] = useImmer([]);
  const navigate = useNavigate();
  const [query, setQuery] = useImmer({ text: '' });

  // Get data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: booksData } = await getAllBooks();
        setBooks(booksData);
        setFiltered(booksData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Creating the new book
  const createNewBook = async (values) => {
    try {
      setLoading(true);
      const { status, data } = await createBook(values);
      console.log(data);
      if (status === 201) {
        toast.success('کتاب جدید با موفقیت ساخته شد.');

        setBooks((draft) => {
          draft.push(data);
        });

        setFiltered((draft) => {
          draft.push(data);
        });

        setBook({});
        setLoading(false);
        navigate('/books');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Alert for deleting book
  const confirmDelete = (bookId, bookName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='confirm-alert'>
            <h3>
              آیا از حذف کتاب <span>{bookName}</span> مطمئن هستید؟
            </h3>
            <div className='confirm-alert-button'>
              <button
                className='btn btn-green'
                onClick={() => {
                  removeBook(bookId);
                  onClose();
                }}
              >
                بله
              </button>
              <button className='btn btn-red' onClick={onClose}>
                نه
              </button>
            </div>
          </div>
        );
      },
    });
  };

  // Deleting a book
  const removeBook = async (bookId) => {
    const allBooks = [...books];
    try {
      const { status } = await deleteBook(bookId);
      const updatedBooks = books.filter((b) => b.id !== bookId);
      if (status === 200) {
        setBooks(updatedBooks);
        setFiltered(updatedBooks);
      }
      navigate('/books');
      toast.error('کتاب مورد نظر حذف شد.');
    } catch (error) {
      setLoading(false);
      setBooks(allBooks);
      setFiltered(allBooks);
    }
  };

  // Searching a book
  const searchBook = (event) => {
    setQuery({ ...query, text: event.target.value });
    const allBooks = books.filter((book) => {
      return book.bookName.includes(event.target.value);
    });

    setFiltered(allBooks);
  };

  return (
    <context.Provider
      value={{
        loading,
        setLoading,
        book,
        setBook,
        books,
        setBooks,
        filtered,
        setFiltered,
        createNewBook,
        deleteBook: confirmDelete,
        query,
        searchBook,
      }}
    >
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <Navbar />
      <div className='main-container'>
        <Routes>
          <Route path='/' element={<Navigate to='/books' />} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/:bookId' element={<ViewBook />} />
          <Route path='/books/edit/:bookId' element={<EditBook />} />
          <Route path='/books/new' element={<NewBook />} />
        </Routes>
      </div>
    </context.Provider>
  );
}

export default App;
