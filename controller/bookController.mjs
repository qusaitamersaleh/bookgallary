
import BookRepo from '../Repository/BookRepo.mjs';
import factory from '../Repository/handlerFactory.mjs';
import Book from '../model/bookModel.mjs';

const addBook = BookRepo.AddBook;
const editBook = BookRepo.editBook;
const getBooks = factory.getAll(Book);
const getBookDetails = factory.getOne(Book);



export default {
    addBook, getBooks, getBookDetails, editBook
}