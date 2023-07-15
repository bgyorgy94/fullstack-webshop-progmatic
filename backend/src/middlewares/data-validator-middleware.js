import HttpError from '../utils/httpError';

const dataValidator = (schema) => async (req, res, next) => {
  try {
    const validData = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    req.body = validData;
    next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      console.log(error.errors);
      next(new HttpError(error.errors[0], 400));
    } else {
      next(error);
    }
  }
};

export default dataValidator;
