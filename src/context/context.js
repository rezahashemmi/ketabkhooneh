import { createContext } from 'react';

export const context = createContext({
  loading: 'false',
  setLoading: () => {},
  book: {},
  setBook: () => {},
  books: [],
  setBooks: () => {},
  filtered: {},
  setFiltered: () => {},
  query: {},
  searchBook: () => {},
  createNewBook: () => {},
  deleteBook: () => {},
});
