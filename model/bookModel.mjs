import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        maxlength: [30, 'A tour fiest name must have less or equal then 30 characters'],
    },
    isbn: {// if it's not text in the requirment would make it Mongoose objectID
        index: true,
        type: Number,
        required: true,
        min: [1, 'ISBN must be above 1'],
        max: [9999999999999, 'ISBN could not be more than 13 digit'],
    },

    authorID: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'author',
    },
}, { versionKey: false });


// BookSchema.pre(/^find/, function (next) {

//     this.populate({
//         path: 'authorID',
//         select: 'first_name last_name',

//     });

//     next();
// });

const Book = mongoose.model('book', BookSchema);

export default Book;
