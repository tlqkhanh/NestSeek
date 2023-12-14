import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../action/auth.action';
import Cookies from 'universal-cookie';

const Login = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredential = { email: username, phoneNum: username, password: password };
    login(userCredential)
      .then((res) => {
        console.log(res.data);
        cookies.set('uid', res.data.user.uid, { path: '/' });
        cookies.set('type', res.data.user.type, { path: '/' });
        cookies.set('username', res.data.user.username, { path: '/' });
        cookies.set('token', res.data.token, { path: '/' });
        console.log(document.cookie);
        navigate("/explore");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-grow justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-bluelight border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <h5 className="text-2xl font-bold text-white">Log In</h5>
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
              Phone number or Email
            </label>
            <input
              id="username"
              type="text"
              placeholder="Phone number or Email"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full text-white bg-blue2 hover:bg-blue2 focus:ring-4 focus:outline-none focus:ring-blue2 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Log in
            </button>
          </div>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-100">
          Not registered? <a href="/sign-up" className="text-blue2 hover:underline ">Đăng ký</a>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
