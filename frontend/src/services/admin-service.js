import privateApi from '../api/privateApi';

export default {
    getAllUsers() {
        return privateApi.get('api/users');
    },
}