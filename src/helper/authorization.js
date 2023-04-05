import axios from 'axios';
import { baseUrl } from './constant';



const register = (fullname, phoneNumber, email, username, password, confirmPassword) => {
    return axios.post(baseUrl + '/users/signup', {
        fullname,
        phoneNumber,
        email,
        username,
        password,
        confirmPassword,
    });
};

const login = (username, password) => {
    return axios
        .post(baseUrl + '/users/login', {
            username,
            password,
        })
        .then((response) => {
            return response.data;
        });
};

const logout = (accessToken) => {
    return axios
        .get(baseUrl + '/users/logout', {
            headers: { Authorization: 'Bearer ' + accessToken },
        })
        .then((response) => {
            return response.data;
        });
};

 const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});



export {  login, logout, register ,axiosPrivate};
