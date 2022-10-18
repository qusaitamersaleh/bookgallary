import Joi from 'joi';
import joioid from 'joi-objectid'
const ObjectId = joioid(Joi);
const addAuthor = data => {
    const schema = Joi.object({
        first_name: Joi.string().min(1).max(20).required(),
        last_name: Joi.string().min(1).max(20).required()
    })
    return schema.validate(data);
}

const editAuthor = data => {
    const schema = Joi.object({
        first_name: Joi.string().min(1).max(20).required(),
        last_name: Joi.string().min(1).max(20).required()

    })
    return schema.validate(data);
}

//books
const addBook = data => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(30).required(),
        isbn: Joi.number().min(1).max(9999999999999).required(),
        authorID: ObjectId().required(),
    })
    return schema.validate(data);
}
const editBook = data => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(30),
        isbn: Joi.number().min(1).max(9999999999999),
        authorID: ObjectId(),
    })
    return schema.validate(data);
}


export {
    addAuthor,
    editAuthor,

    addBook,
    editBook,

};
