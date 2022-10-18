
import { expect } from "chai";
import request from "supertest";
import app from "../../app.mjs";
import setup from "../setup.spec.mjs";

const V = process.env.API_Virsion;
var author, author2;

before(async function () {

    try {
        // randomID = await new mongoose.Types.ObjectId();
        author = await setup.creatAuthor();
        author2 = await setup.creatAuthor2();
        this.timeout(2000);
    }
    catch (err) {
        throw err
    }

});

describe("Post /add author", function () {
    it("add author sucess ", async function () {
        const res = await request(app)
            .post(`/api/${V}/author/add-author`)
            .send({
                "first_name": "Qusai",
                "last_name": "BJ"
            });

        try {
            expect(res.status).to.equal(200);
        }
        catch (err) {
            throw err;
        }
    });

    it("add auhtor exist before ", async function () {
        const res = await request(app)
            .post(`/api/${V}/author/add-author`)
            .send({
                "first_name": author.first_name,
                "last_name": author.last_name
            });
        expect(res.status).to.equal(409);
    });

    it("send author without first name or-and last name ", async function () {
        var res = await request(app)
            .post(`/api/${V}/author/add-author`)
            .send({
                "first_name": "Qusai",

            });
        expect(res.status).to.equal(400); // from the validation route
        res = await request(app)
            .post(`/api/${V}/author/add-author`)
            .send({
                "last_name": "BJ"
            });
        expect(res.status).to.equal(400); // from the validation route

        res = await request(app)
            .post(`/api/${V}/author/add-author`)
            .send({

            });
        expect(res.status).to.equal(400); // from the validation route
    });



});

describe("patch /edit author", function () {
    it("edit author sucess ", async function () {
        const res = await request(app)
            .patch(`/api/${V}/author/edit-author/${author.id}`)
            .send({
                "first_name": "Marten MM",
                "last_name": "BJ"
            });
        try {
            expect(res.status).to.equal(200);
        }
        catch (err) {
            throw err;
        }
    });

    it("send not valid ID to edit author", async function () {
        const res = await request(app)
            .patch(`/api/${V}/author/edit-author/xxx`)
            .send({
                "first_name": "Marten MM",
                "last_name": "BJ"
            });
        try {
            expect(res.status).to.equal(400);
        }
        catch (err) {
            throw err;
        }
    });

    it("edit author to already exsited full name ", async function () {
        const res = await request(app)
            .patch(`/api/${V}/author/edit-author/${author2.id}`)
            .send({
                "first_name": author.first_name,
                "last_name": author.last_name
            });
        expect(res.status).to.equal(409);
    });

    it("send author without [first_name or-and last_name] ", async function () {
        var res = await request(app)
            .patch(`/api/${V}/author/add-author`)
            .send({
                "first_name": "Qusai",

            });
        expect(res.status).to.equal(400); // from the validation route
        res = await request(app)
            .patch(`/api/${V}/author/add-author`)
            .send({
                "last_name": "BJ"
            });
        expect(res.status).to.equal(400); // from the validation route

        res = await request(app)
            .patch(`/api/${V}/author/add-author`)
            .send({

            });
        expect(res.status).to.equal(400); // from the validation route
    });



});

describe("get/id - getting author data by id ", function () {
    it("get author by id sucesfuly", async function () {
        const res = await request(app)
            .get(`/api/${V}/author/get-author/${author.id}`);
        try {
            expect(res.status).to.equal(200);
        }
        catch (err) {
            throw err;
        }
    });

    it("send not valid ID to edit author", async function () {
        const res = await request(app)
            .get(`/api/${V}/author/get-author/xxx`);
        try {
            expect(res.status).to.equal(400);
        }
        catch (err) {
            throw err;
        }
    });


});