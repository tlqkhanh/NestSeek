import classNames from 'classnames';
import React, {useState} from 'react';
function SignUp() {
    
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = () => {
        console.log(firstName,lastName,email,password,confirmPassword);
    }

    return(
        <div className='w-full flex justify-center items-center mt-20'>
            <div className={classNames("login-wrapper flex flex-col items-center", 'bg-bluelight rounded-xl', 'md:w-[60%] md:h-[100%] p-6 sm:w-fit sm:h-fit')}>
                <div className='font-semibold text-2xl text-darkblue lg:p-8 md:p-6 sm:p-2'>Sign Up</div>
                <div className="form ">
                    <div className="form-body">
                        <div className="username md:pb-4 sm:pb-2">
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                type="text" 
                                value={firstName} onChange = {(e) => handleInputChange(e)} 
                                id="firstName" 
                                placeholder="First Name"
                            />
                        </div>
                        <div className="lastname md:pb-4 sm:pb-2">
                            <input  type="text" name="" id="lastName" value={lastName}  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    onChange = {(e) => handleInputChange(e)} 
                                    placeholder="LastName"/>
                        </div>
                        <div className="email md:pb-4 sm:pb-2">
                            <input  type="email" id="email" 
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    value={email} onChange = {(e) => handleInputChange(e)} 
                                    placeholder="Email"/>
                        </div>
                        <div className="password md:pb-4 sm:pb-2">
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
                        </div>
                        <div className="confirm-password md:pb-4 sm:pb-2">
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
                        </div>
                    </div>
                    <div className="footer ">
                        <button onClick={()=>handleSubmit()} type="submit" className="bg-darkblue py-2 px-4 rounded-lg text-white">Register</button>
                    </div>
                </div>
            </div>
        </div>
    )       
}

export default SignUp