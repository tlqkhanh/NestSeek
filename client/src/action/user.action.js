// import axios from "axios";

// const USER_API_URL = "http://localhost:9000/server/api/auth";

// export const register = (userInfo) => {
//     return axios.post(`${USER_API_URL}/signup.php`, userInfo,{
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
// };

// /*
//     req: userCredential{
//         email: email-phoneNum,
//         phoneNum: email-phoneNum,
//         password: password
//     }

//     res: data {
//         'success' => true,
//         'message' => 'Login successful',
//         'user' => [
//             'uid' => $res['userID'],
//             'username' => $res['user_name'],
//             'type' => $res['user_type'],
//         ],
//         'token' => $token,
//     }

// */

// export const login = (userCredential) => {
//     return axios.post(`${USER_API_URL}/login.php`, userCredential);
// };