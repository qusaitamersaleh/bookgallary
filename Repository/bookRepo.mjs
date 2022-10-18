import Book from '../model/bookModel.mjs';
import Author from '../model/authorModel.mjs';
import mongoose from 'mongoose';

const AddBook = async (req, res) => {

    const { name, isbn, authorID } = req.body;
    //  check if Book existed 
    const book = await Book.findOne({ isbn });
    if (book) {
        return res.status(409).json({
            error: 'The book already exist in the website',
        });
    }
    if (await authorNotExist(authorID))
        return res.status(404).json({
            error: 'auther ID is wrong ',
        })

    Book.create({
        name,
        isbn,
        authorID: mongoose.Types.ObjectId(authorID)
    }).then((book) => {
        return res.status(200).json({
            book
        });
    })

}
const editBook = async (req, res) => {
    var { name, isbn, authorID } = req.body;
    authorID = mongoose.Types.ObjectId(authorID)

    const book = await Book.findOne({ isbn });
    const books = await Book.find();
    // console.log("req.params.id "+ req.params.id)
    // console.log("isbn"+ isbn)
    // console.log(book)
    // console.log(books)
    if (book && book._id != req.params.id) {
        return res.status(409).json({
            message:"ISB existed"
        });
    }
    if (await authorNotExist(authorID))
        return res.status(404).json({
            error: 'auther ID is wrong ',
        })
    await Book.findByIdAndUpdate(req.params.id, {
        name, isbn, authorID
    });

    return res.sendStatus(200);

};

async function authorNotExist(authorID) {
    const authoer = await Author.findById(authorID);
    return authoer ? false : true;
}

export default { AddBook, editBook };
