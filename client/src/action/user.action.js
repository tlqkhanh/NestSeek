import axios from "axios";

const USER_API_URL = "http://localhost:9000/server/api/auth";

export const register = (userInfo) => {
    return axios.post(`${USER_API_URL}/signup.php`, userInfo,{
        headers: {
            'Content-Type': 'application/json',
        },
    });
};


export const login = (user) => {
    return axios.post(`${USER_API_URL}/login.php`, user);
};