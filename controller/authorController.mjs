
import AuthorRepo from '../Repository/authorRepo.mjs';
import factory from '../Repository/handlerFactory.mjs';
import Author from '../model/authorModel.mjs';

const addAuthor = AuthorRepo.AddAuthor;
const editAuthor = AuthorRepo.editAuthor;
const getAuthors = factory.getAll(Author);;
const getAuthorDetails = factory.getOne(Author);


export default {
    addAuthor,
    getAuthors,
    getAuthorDetails,
    editAuthor,
};
