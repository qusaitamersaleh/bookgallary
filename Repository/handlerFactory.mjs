import APIFeatures from '../utils/apiFeatures.mjs';

const getAll = Model => async (req, res, next) => {

  const features = new APIFeatures(Model.find(), req.query)
    .limitFields()
    .paginate();
  // const doc = await features.query.explain();
  const doc = await features.query;
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: doc

  });

}

const getOne = Model => async (req, res, next) => {

  const doc = await Model.findById(req.params.id);
  try {

    if (doc)
      return res.status(200).json({
        status: 'success',
        results: doc.length,
        data: doc

      });
    else
      return res.status(404).json({
        status: 'not found !',


      });

  } catch (e) {
    return res.send(e.message);
  }
}

export default {
  getAll,
  getOne 
};
