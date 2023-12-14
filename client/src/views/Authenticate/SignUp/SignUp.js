import classNames from 'classnames';
import React, {useState} from 'react';
import axios from 'axios';
function SignUp() {

    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        fullName: '',
        bankNumber: '',
        bankName: '',
        userType: 'renter', // Default to 'owner'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post(`http://localhost:9000/server/api/auth/signup.php`,{
                userName: formData.username,
                email: formData.email,
                phoneNum: formData.phoneNumber,
                password: formData.password,
                fullName: formData.fullName,
                type: formData.userType,
                bankNum: formData.bankNumber,
                bankName: formData.bankName,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=> {
                if (response.status>=200 && response.status<400){
                    console.log(response.data.message);
                    window.location.href = "/log-in";
                }
            })
            .catch(err => {
                console.log("Error: ", err.response.data.message)
            })
        } catch (error) {
            console.log(error);
        }
      };

    return(
        <div className='w-full flex justify-center items-center mt-20'>
            <div className={classNames("login-wrapper flex flex-col items-center", 'bg-bluelight rounded-xl', 'md:w-[60%] md:h-[100%] p-6 sm:w-fit sm:h-fit')}>
                <div className='font-semibold text-2xl text-darkblue lg:p-8 md:p-6 sm:p-2'>Sign Up</div>
                {/* <div className="form ">
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
                </div> */}
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </label>

                    <label>
                        Phone Number:
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>

                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>

                    <label>
                        Full Name:
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    </label>

                    <label>
                        Bank Number (optional):
                        <input type="text" name="bankNumber" value={formData.bankNumber} onChange={handleChange} />
                    </label>

                    <label>
                        Bank Name (optional):
                        <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
                    </label>

                    <div>
                        <label>
                        User Type:
                        <input
                            type="radio"
                            name="userType"
                            value="owner"
                            checked={formData.userType === 'owner'}
                            onChange={handleChange}
                        />
                        Owner
                        </label>
                        <label>
                        <input
                            type="radio"
                            name="userType"
                            value="renter"
                            checked={formData.userType === 'renter'}
                            onChange={handleChange}
                        />
                        Renter
                        </label>
                    </div>

                    <button type="submit">Sign Up</button>
                    </form>
            </div>
        </div>
    )       
}

export default SignUp