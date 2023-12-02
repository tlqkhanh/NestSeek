import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// ### call API login here ###
// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        // e.preventDefault();
        // const token = await loginUser({
        //   username,
        //   password
        // });
        // setToken(token);
      }
  return(
    <div className='w-full flex justify-center items-center'>
    <div className={classNames("login-wrapper flex flex-col items-center", 'bg-bluelight rounded-xl', 'md:w-[60%] md:h-[100%] p-6 sm:w-fit sm:h-fit')}>
      <div className='font-semibold text-2xl text-darkblue lg:p-8 md:p-6 sm:p-2'>Log In</div>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
        <label className='md:pb-4 sm:pb-2'>
          <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                 type="text" 
                 placeholder="Phone number" 
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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }