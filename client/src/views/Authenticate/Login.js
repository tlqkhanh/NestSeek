import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { login } from '../../action/auth.action';
import Cookies from 'universal-cookie';

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const cookies = new Cookies();


    const handleSubmit = async e => {
      e.preventDefault();
      const userCredential = {email: username, phoneNum: username, password: password};
      login(userCredential)
      .then(res => {
        console.log(res.data);
        cookies.set('uid',res.data.user.uid, {path: '/'});
        cookies.set('type',res.data.user.type, {path: '/'});
        cookies.set('username',res.data.user.username, {path: '/'});
        cookies.set('token',res.data.token, {path: '/'});
        console.log(document.cookie);
        navigate("/explore/postDetail/1");
      })
      .catch(error => {
        console.log(error);
      })
    }
  return(
    <div className='w-full flex justify-center items-center'>
    <div className={classNames("login-wrapper flex flex-col items-center", 'bg-bluelight rounded-xl', 'md:w-[60%] md:h-[100%] p-6 sm:w-fit sm:h-fit')}>
      <div className='font-semibold text-2xl text-darkblue lg:p-8 md:p-6 sm:p-2'>Log In</div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
        <label className='md:pb-4 sm:pb-2'>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                 type="text" 
                 placeholder="Phone number or Email" 
                 onChange={e => setUserName(e.target.value)}
          />
        </label>
        <label>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                 type="password" 
                 placeholder="Password" 
                 onChange={e => setPassword(e.target.value)}/>
        </label>
        <div className='md:p-6 sm:p-2'>
          <button className='bg-darkblue py-2 px-4 rounded-lg text-white' type="submit">Log in</button>
        </div>
      </form>
    </div>
    </div>
  )
}
