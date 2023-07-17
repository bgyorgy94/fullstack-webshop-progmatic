import usersModel from "../database/models/users-model";

export default {
    find(payload) {
        return usersModel.find(payload);
    },

    update(payload) {
        return usersModel.update(payload);
    },

    delete(payload) {
        return usersModel.delete(payload);
    }
}