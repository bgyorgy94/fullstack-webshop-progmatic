import cartModel from '../database/models/cart-model';

export default {
    add(payload) {
        return cartModel.create(payload);
    }
}