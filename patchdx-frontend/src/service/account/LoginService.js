
import axios from 'axios';
import Account from '../constants/Account';
import { API_END_POINT } from '../../Constants'

const UserLogin = (data) => {
    return axios
        .post(`${API_END_POINT}${Account.USER_SIGN_IN}`, data)
        .then(res => res)
        .catch(err => err);
}

const LogoutUser = async () => {
    localStorage.clear();
    return axios
        .get(`${API_END_POINT}${Account.USER_LOG_OUT}`)
        .then((res) => res)
        .catch((err) => err);
};

export {
    UserLogin,
    LogoutUser,
}