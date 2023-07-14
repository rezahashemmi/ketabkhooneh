import { Link } from 'react-router-dom';

const AddBook = () => {
  return (
    <Link to='/books/new' className='btn btn-purple btn-add'>
      اضافه کردن کتاب جدید
    </Link>
  );
};
export default AddBook;
