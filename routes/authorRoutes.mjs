import express from 'express';
import AuthorConroller from '../controller/authorController.mjs';

import { addAuthor, editAuthor } from '../middlewares/schemas.mjs';
import validator from '../middlewares/schemaValidator.mjs';
import IDValidator from'../middlewares/ID_Validator.mjs';
const router = express.Router();
 /**
 * @swagger
 * /api/v1/author/add-author:
 * 
 *  post:
 *    tags: [Author]
 *    description: adding author details to the galary
 *    parameters: 
 *            - in: path
 *              name: first_name
 *              schema:
 *                  type: String
 *              required: true
 *              minimum: 1
 *              maximum: 20
 *              description: the author first name 

 *            - in: path
 *              name: first_name
 *              schema:
 *                  type: String
 *              minimum: 1
 *              maximum: 20
 *              description: the author last name 
 * 
 *    responses:
 *              "200": 
 *                  description: success
 *              "409": 
 *                  description: conflict, author alreadt exist 
 *              "500":
 *                  description: Internal server error
 */
router.post('/add-author', validator(addAuthor), AuthorConroller.addAuthor);

/**
 * @swagger
 * /api/v1/get-authors:
 * 
 *  get:
 *    tags: [Author]
 *    description: getting all inserted authors, you can use queries limitFields & paginate
 *    responses:
 *              "200": 
 *                  description: success
 *              "500":
 *                  description: Internal server error
 */
router.get('/get-authors', AuthorConroller.getAuthors);
/**
 * @swagger
 * /api/v1/author/get-author/:authorID:
 * 
 *  get:
 *    tags: [Author]
 *    description: get auhtoers details by id
 *    responses:
 *              "200": 
 *                  description: success
 *              "404": 
 *                  description: author not found
 *              "500":
 *                  description: Internal server error
 */
router.get('/get-author/:id',IDValidator, AuthorConroller.getAuthorDetails);
/**
 * @swagger
 * /api/v1/author/edit-author/:authorID:
 * 
 *  patch:
 *    tags: [Author]
 *    description: edit auhtoers details
  *    parameters: 
 *            - in: path
 *              name: first_name
 *              schema:
 *                  type: String
 *              required: true
 *              minimum: 1
 *              maximum: 20
 *              description: the author first name 

 *            - in: path
 *              name: first_name
 *              schema:
 *                  type: String
 *              minimum: 1
 *              maximum: 20
 *              description: the author last name 
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
router.patch('/edit-author/:id',IDValidator, validator(editAuthor), AuthorConroller.editAuthor);

export default router;

