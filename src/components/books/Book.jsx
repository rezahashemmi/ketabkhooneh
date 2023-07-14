import { Link } from 'react-router-dom';
const Book = ({ book }) => {
  return (
    <div class='book'>
      <div class='book-wrapper'>
        <img class='book-cover' src={book.bookCover} alt={book.bookName} />
        <div class='book-data'>
          <p class='book-name'>{book.bookName}</p>
          <p class='book-author'>{book.bookAuthor}</p>
          <Link to={`/books/${book.id}`} className='book-more'>
            بیشتر بخوانید...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Book;
