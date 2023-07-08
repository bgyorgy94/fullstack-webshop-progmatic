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

  find(req, res, next) {
    const { id } = req.params;
    productsService
      .find({ id })
      .then((product) => {
        console.log(product);
        res.status(200).send(product);
      })
      .catch(next);
  },

  create(req, res, next) {
    const { title, price, description, categoryId } = req.body;
    if (!price || !title) throw new HttpError('missing required parameter', 400);
    productsService
      .create({ title, price: Number(price), description, categoryId })
      .then((product) => res.status(201).send(product))
      .catch(next);
  },

  delete(req, res, next) {
    const { id } = req.params;
    productsService
      .delete({ id })
      .then((product) => res.status(200).send(product))
      .catch(next);
  },
};
