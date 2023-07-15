import cartService from '../services/cart-service';

export default {
    add(req, res, next) {
        const { productId, userId } = req.body;
        cartService
        .add({ productId, userId })
        .then(addedProduct => res.send(addedProduct))
    }
}