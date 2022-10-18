import Joi from 'joi';
import joioid from 'joi-objectid';
const ObjectId = joioid(Joi);

const validator = (req, res, next) => {
    const schema = Joi.object({
        authorID: ObjectId(),
        id: ObjectId(),
    })
    const { error } = schema.validate(req.params);
    if (!error)
        next();
    else {
        return res.status(400).json({
            error: error.message
        });
    }
}

export default validator;