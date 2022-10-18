import Author from '../model/authorModel.mjs';
import Book from '../model/bookModel.mjs';

import mongoose from "mongoose";

const test = (process.env.NODE_ENV == "test") ? true : false;
if (!test) console.log('warning x💥x💥x💥x💥x set the env to test x💥x💥x💥x💥x');




const creatAuthor = async () => {
    if (test) {
        const author = await Author.create({
            "first_name": "Ahmad",
            "last_name": "BJ",
        });
        return author;
    }
    else return;
}
const creatAuthor2 = async () => {
    if (test) {
        const author = await Author.create({
            "first_name": "Rami",
            "last_name": "MM",
        });
        return author;
    }
    else return;
}


const creatBook = async () => {
    if (test) {
        const authorx = await Author.create({
            "first_name": "authorr",
            "last_name": "X",
        });
        const book = await Book.create({
            "name": "how to focus",
            "isbn": 55555, //333
            "authorID": authorx._id
        });
        return book;
    }
    else return;
}

const creatBook2 = async () => {
    if (test) {
        const authorx = await Author.create({
            "first_name": "authorr",
            "last_name": "XX",
        });
        const book = await Book.create({
            "name": "problem solving",
            "isbn": 666666,
            "authorID": authorx._id
        });
        return book;
    }
    else return;
}

const creatBook3 = async () => {
    if (test) {
        const authorx = await Author.create({
            "first_name": "authorr",
            "last_name": "XXX",
        });
        const book = await Book.create({
            "name": "coding gym",
            "isbn": 8888,
            "authorID": authorx._id
        });
        return book;
    }
    else return;
}
const creatBook4 = async () => {
    if (test) {
        const authorx = await Author.create({
            "first_name": "authorr",
            "last_name": "XXXX",
        });
        const book = await Book.create({
            "name": "code like monkey",
            "isbn": 99,
            "authorID": authorx._id
        });
        return book;
    }
    else return;
}
export default {
    creatAuthor, creatAuthor2,
    creatBook, creatBook2, creatBook3, creatBook4

}