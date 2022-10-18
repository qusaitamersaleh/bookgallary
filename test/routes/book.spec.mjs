process.env.NODE_ENV = "test";

import { expect } from "chai";
import request from "supertest";
import app from "../../app.mjs";
import setup from "../setup.spec.mjs";
import mongoose from "mongoose";
const V = process.env.API_Virsion;
var author, book, book2, book3, book4;
const randomID = mongoose.Types.ObjectId();

before(async function () {
    try {
        author = await setup.creatAuthor();
        book = await setup.creatBook();
        book2 = await setup.creatBook2();
        book3 = await setup.creatBook3();
        book4 = await setup.creatBook4();
        this.timeout(10000);
    }
    catch (err) {
        throw err
    }
});

describe("Post /add book", function () {
    it("add Book sucessfly ", async function () {
        const res = await request(app)
            .post(`/api/${V}/book/add-book`)
            .send({
                "name": "crisis management III",
                "isbn": 777888,
                "authorID": author._id
            });
        try {
            expect(res.status).to.equal(200);
        }
        catch (err) {
            throw err;
        }
    });
    it("add book with existed ISBN ", async function () {
        const res = await request(app)
            .post(`/api/${V}/book/add-book`)
            .send({
                "name": "how to sleep",
                "isbn": book.isbn,
                "authorID": author._id
            });
        expect(res.status).to.equal(409);
    });
    it("add book with existed Name ", async function () {
        const res = await request(app)
            .post(`/api/${V}/book/add-book`)
            .send({
                "name": book.name,
                "isbn": book.isbn,
                "authorID": author._id
            });
        expect(res.status).to.equal(409);

    });
    it("add book without existed authorID ", async function () {
        //case 1
        var res = await request(app)
            .post(`/api/${V}/book/add-book`)
            .send({
                "name": "book name",
                "isbn": 123123123123,
                "authorID": randomID
            });
        expect(res.status).to.equal(404);
    });
    it("add book without valid authorID ", async function () {
        var res = await request(app)
            .post(`/api/${V}/book/add-book`)
            .send({
                "name": "book name",
                "isbn": 123123123123,
                "authorID": "xxxx"
            });

        expect(res.status).to.equal(400);
    });
    it("send book without requried feelds ", async function () {
        // results will come from the validator middleware
        //case1
        var res = await request(app)
            .post(`/api/${V}/book/add-book`)
            .send({
                "name": "how to how",
                "isbn": 78897897897,
                //"authorID": author.id
            });
        expect(res.status).to.equal(400);
        res = await request(app)
            .post(`/api/${V}/author/add-book`)
            .send({
                "name": "book name",
                // "isbn": "123123123123",
                "authorID": author.id
            });
        expect(res.status).to.equal(400); // from the validation route

        res = await request(app)
            .post(`/api/${V}/author/add-author`)
            .send({
                //   "name": "book name",
                "isbn": 7979878979,
                "authorID": author.id
            });
        expect(res.status).to.equal(400); // from the validation route
    });
});

describe("patch /edit book", function () {
    it("edit book sucessfuly ", async function () {
        const res = await request(app)
            .patch(`/api/${V}/book/edit-book/${book._id}`)
            .send({
                "name": "coding basics",
                "isbn": 333,
                "authorID": author._id
            });
        try {
            expect(res.status).to.equal(200);
        }
        catch (err) {
            throw err;
        }
    });

    it("send not valid ID to edit book", async function () {
        const res = await request(app)
            .patch(`/api/${V}/book/edit-author/xxx`)
            .send({
                "name": "code basics",
                "isbn": 333,
                "authorID": author._id
            });
        try {
            expect(res.status).to.equal(400);
        }
        catch (err) {
            throw err;
        }
    });

    it("edit book with alrady exsiting isbn", async function () {

        const res = await request(app)
            .patch(`/api/${V}/book/edit-book/${book3._id}`)
            .send({
                "name": "JS",
                "isbn": book4.isbn,
                "authorID": author._id
            });
        expect(res.status).to.equal(409);
    });


});

describe("get/id - getting book data by id ", function () {
    it("get Book by id sucesfuly", async function () {
        const res = await request(app)
            .get(`/api/${V}/book/get-book/${book.id}`);
        try {
            expect(res.status).to.equal(200);
        }
        catch (err) {
            throw err;
        }
    });

    it("send not valid ID to edit book", async function () {
        const res = await request(app)
            .get(`/api/${V}/book/get-book/xxx`);
        try {
            expect(res.status).to.equal(400);
        }
        catch (err) {
            throw err;
        }
    });


});

describe("get all books - getting books  ", function () {
    it("get all Books  sucesfuly", async function () {
        const res = await request(app)
            .get(`/api/${V}/book/get-books`);
        try {
            expect(res.status).to.equal(200);
        }
        catch (err) {
            throw err;
        }
    });



}); 