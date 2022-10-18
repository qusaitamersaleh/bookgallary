import express from 'express';
import BookConroller from '../controller/bookController.mjs';

import { addBook, editBook } from '../middlewares/schemas.mjs';
import validator from '../middlewares/schemaValidator.mjs';
import IDValidator from '../middlewares/ID_Validator.mjs';
const router = express.Router();


/**
 * @swagger
 * /api/v1/book/add-book:
 * 
 *  post:
 *    tags: [Book]
 *    description: adding book details to the galary
 *    parameters: 
 *            - in: path
 *              name: name
 *              schema:
 *                  type: String
 *              required: true
 *              minimum: 1
 *              maximum: 20
 *              description: the book name 

 *            - in: path
 *              name: isbn
 *              schema:
 *                  type: Number
 *              minimum: 1
 *              maximum: 20
 *              description: the ISBN number 
 *
 *            - in: path
 *              name: authorID
 *              schema:
 *                  type: ObjectID
 *              description: The book Author ID  
 *    responses:
 *              "200": 
 *                  description: success
 *              "409": 
 *                  description: conflict, author alreadt exist 
 *              "500":
 *                  description: Internal server error
 */
router.post('/add-book', validator(addBook), BookConroller.addBook);
/**
 * @swagger
 * /api/v1/get-books:
 * 
 *  get:
 *    tags: [Book]
 *    description: getting all  Books, you can use queries limitFields & paginate
 *    responses:
 *              "200": 
 *                  description: success
 *              "500":
 *                  description: Internal server error
 */
router.get('/get-books', BookConroller.getBooks);
/**
 * @swagger
 * /api/v1/book/get-book/:id:
 * 
 *  get:
 *    tags: [Book]
 *    description: get Book details by it id
 *
 *    responses:
 *              "200": 
 *                  description: success
 *              "404": 
 *                  description: book not found
 *              "500":
 *                  description: Internal server error
 */
router.get('/get-book/:id', IDValidator, BookConroller.getBookDetails);

/**
 * @swagger
 * /api/v1/book/edit-author/:id:
 * 
 *  patch:
 *    tags: [Book]
 *    description: edit book details
 *    parameters: 
 *            - in: path
 *              name: name
 *              schema:
 *                  type: String
 *              required: true
 *              minimum: 1
 *              maximum: 20
 *              description: the book name 

 *            - in: path
 *              name: isbn
 *              schema:
 *                  type: Number
 *              minimum: 1
 *              maximum: 20
 *              description: the ISBN number 
 *
 *            - in: path
 *              name: authorID
 *              schema:
 *                  type: ObjectID
 *              description: The book Author ID  
 *    responses:
 *              "200": 
 *                  description: success
 *              "404": 
 *                  description: author not found
 *              "409": 
 *                  description: conflict, the new edit contains unieq key already exsit
 *              "500":
 *                  description: Internal server error
 */

router.patch('/edit-book/:id', IDValidator, validator(editBook), BookConroller.editBook);


export default router;

