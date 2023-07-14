import axios from 'axios';
const serverURL = 'http://localhost:4000/';

export const getAllBooks = () => {
  const url = `${serverURL}books`;
  return axios.get(url);
};

export const getAllPublishers = () => {
  const url = `${serverURL}publishers`;
  return axios.get(url);
};

export const getBook = (bookId) => {
  const url = `${serverURL}books/${bookId}`;
  return axios.get(url);
};

export const getPublisher = (publisherId) => {
  const url = `${serverURL}publishers/${publisherId}`;
  return axios.get(url);
};

export const deleteBook = (bookId) => {
  const url = `${serverURL}books/${bookId}`;
  return axios.delete(url);
};

export const editBook = (book, bookId) => {
  const url = `${serverURL}books/${bookId}`;
  return axios.put(url, book);
};

export const createBook = (book) => {
  const url = `${serverURL}books`;
  return axios.post(url, book);
};
