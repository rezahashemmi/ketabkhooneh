/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Loading } from '../index';
import { context } from '../../context/context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formSchema } from '../../validations/formSchema';
import { getBook, editBook } from '../../services/services';
import { toast } from 'react-toastify';

const EditBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const { loading, setLoading, setBooks, setFiltered } = useContext(context);

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

  const updateBook = async (values) => {
    try {
      setLoading(true);
      const { data, status } = await editBook(values, bookId);

      if (status === 200) {
        setLoading(false);
        toast.info('کتاب با موفقیت ویرایش شد.');

        setBooks((draft) => {
          const bookIndex = draft.findIndex(
            (book) => book.id === parseInt(bookId)
          );
          draft[bookIndex] = { ...data };
        });

        setFiltered((draft) => {
          const bookIndex = draft.findIndex(
            (book) => book.id === parseInt(bookId)
          );
          draft[bookIndex] = { ...data };
        });

        navigate(`/books/${bookId}`);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Formik
            initialValues={book}
            validationSchema={formSchema}
            onSubmit={(values) => {
              updateBook(values);
            }}
          >
            <Form>
              <div className='input-container'>
                <Field
                  type='text'
                  name='bookName'
                  placeholder='نام کتاب: '
                  className='txt'
                />
                <ErrorMessage
                  component='span'
                  name='bookName'
                  className='error'
                />
              </div>
              <div className='input-container'>
                <Field
                  type='text'
                  name='bookAuthor'
                  placeholder='نام نویسنده: '
                  className='txt'
                />
                <ErrorMessage
                  component='span'
                  name='bookAuthor'
                  className='error'
                />
              </div>
              <div className='input-container'>
                <Field
                  type='text'
                  name='bookPublisher'
                  placeholder='نام ناشر: '
                  className='txt'
                />
                <ErrorMessage
                  component='span'
                  name='bookPublisher'
                  className='error'
                />
              </div>
              <div className='input-container'>
                <Field
                  type='text'
                  name='bookAbstract'
                  placeholder='خلاصه کتاب: '
                  className='txt'
                />
                <ErrorMessage
                  component='span'
                  name='bookAbstract'
                  className='error'
                />
              </div>
              <div className='input-container'>
                <Field
                  type='text'
                  name='bookCover'
                  placeholder='جلد کتاب: '
                  className='txt'
                />
                <ErrorMessage
                  component='span'
                  name='bookCover'
                  className='error'
                />
              </div>
              <Field
                type='submit'
                name='bookSubmit'
                className='btn btn-green btn-action'
                value='ویرایش کتاب'
              />
              <Link to='/' className='btn btn-red btn-action'>
                انصراف
              </Link>
            </Form>
          </Formik>
          {/* <form onSubmit={updateBook}>
            <input
              type='text'
              name='bookName'
              id='bookName'
              value={book.bookName}
              onChange={handelChange}
              required={true}
              className='txt'
            />
            <input
              type='text'
              name='bookAuthor'
              id='bookAuthor'
              value={book.bookAuthor}
              onChange={handelChange}
              required={true}
              className='txt'
            />
            <input
              type='text'
              name='bookPublisher'
              id='bookPublisher'
              value={book.bookPublisher}
              onChange={handelChange}
              required={true}
              className='txt'
            />
            <input
              type='text'
              name='bookAbstract'
              id='bookAbstract'
              value={book.bookAbstract}
              onChange={handelChange}
              required={true}
              className='txt'
            />
            <input
              type='text'
              name='bookCover'
              id='bookCover'
              value={book.bookCover}
              onChange={handelChange}
              required={true}
              className='txt'
            />
            <input
              type='submit'
              name='submitEdit'
              id='submitEdit'
              value='ویرایش'
              className='btn btn-green btn-action '
            />
            <Link
              to={`/books/${bookId}`}
              name='cancelEdit'
              id='cancelEdit'
              className='btn btn-red btn-action'
            >
              انصراف
            </Link>
          </form> */}
        </>
      )}
    </>
  );
};

export default EditBook;
