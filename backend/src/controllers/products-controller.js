import productsService from '../services/products-service';
import HttpError from '../utils/httpError';

export default {
  findAll(req, res, next) {
    productsService
      .findAll()
      .then((products) => {
        res.send({ products });
      })
      .catch(next);
  },

  create(req, res, next) {
    const { price, name } = req.body;
    if (!price || !name) throw new HttpError('missing required parameter', 400);
    productsService
      .create({ price: Number(price), name })
      .then((product) => res.status(201).send(product))
      .catch(next);
  },
};
