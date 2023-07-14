import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { formSchema } from '../../validations/formSchema';
import { context } from '../../context/context';

const NewBook = () => {
  const { createNewBook } = useContext(context);

  // const uploadImage = (e) => {
  //   let img = document.getElementById('image');
  //   img.src = URL.createObjectURL(e.target.files[0]);
  // };

  return (
    <>
      <Formik
        initialValues={{
          bookName: '',
          bookAuthor: '',
          bookPublisher: '',
          bookAbstract: '',
          bookCover: '',
        }}
        validationSchema={formSchema}
        onSubmit={(values) => {
          createNewBook(values);
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
            <ErrorMessage component='span' name='bookName' className='error' />
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
            {/* <img alt='cover' id='image' />
            <input type='file' onChange={uploadImage} /> */}
            <Field
              type='url'
              name='bookCover'
              placeholder='جلد کتاب: '
              className='txt'
            />
            <ErrorMessage component='span' name='bookCover' className='error' />
          </div>
          <Field
            type='submit'
            name='bookSubmit'
            className='btn btn-green btn-action'
            value='ثبت کتاب جدید'
          />
          <Link to='/' className='btn btn-red btn-action'>
            انصراف
          </Link>
        </Form>
      </Formik>
    </>
  );
};
export default NewBook;
