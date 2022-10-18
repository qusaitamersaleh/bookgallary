
import Author from '../model/authorModel.mjs';

const AddAuthor = async (req, res) => {

    const {
        first_name,
        last_name,
    } = req.body;


    const author = await Author.find({
        first_name,
        last_name,
    });

    if (author.length > 0) {
        return res.status(409).json({
            error: 'Authoer aldready exist in the website',
        });
    }
    else
        Author.create({
            first_name,
            last_name,
        },).then((author) => {
            return res.status(200).json({
                author
            });
        })



}
const editAuthor = async (req, res) => {
    const {
        first_name,
        last_name,
    } = req.body;


    const author = await Author.find({
        first_name,
        last_name,
    });
 
    if (author.length > 0) {
        if (author[0].id != req.params.id)
            return res.status(409).json({ error: 'Authoer aldready exist in the website' });
        else
            return res.sendStatus(200); // no need to hit on the DB, it's the same author
    }

    await Author.findByIdAndUpdate(req.params.id, {
        first_name,
        last_name,
    })
    return res.status(200).json({
        "messege": "author updates"
    });
}
export default { AddAuthor, editAuthor };

