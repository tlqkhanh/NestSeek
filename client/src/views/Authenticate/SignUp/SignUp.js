import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    
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

    return (
        <div className="flex justify-center items-center pb-8">
            <div className="w-full max-w-md p-4 bg-bluelight border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-10">
                <form className="space-y-6 p-6 flex flex-col items-center" onSubmit={handleSubmit}>
                    <h5 className="text-2xl font-bold text-white">Sign Up</h5>
                    <div className="flex text-sm text-blue2">
                        User Type :
                        <label className="ml-2">
                            <input
                                type="radio"
                                name="userType"
                                value="owner"
                                checked={formData.userType === 'owner'}
                                onChange={handleChange}
                                className='mr-2'
                            />
                            Owner
                        </label>
                        <label className="ml-4">
                            <input
                                type="radio"
                                name="userType"
                                value="renter"
                                checked={formData.userType === 'renter'}
                                onChange={handleChange}
                                className='mr-2 '
                            />
                            Renter
                        </label>
                    </div>

                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-white m-4">
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} className="lg:w-96 bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:pl-4 md:pr-4" />
                    </label>

                    <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-white">
                        Phone Number:
                        <input className="lg:w-96 bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:pl-4 md:pr-4" type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    </label>

                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                        Email:
                        <input className="lg:w-96 bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:pl-4 md:pr-4" type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>

                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
                        Password:
                        <input className="lg:w-96 bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:pl-4 md:pr-4" type="password" name="password" value={formData.password} onChange={handleChange} />
                    </label>

                    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-white">
                        Full Name:
                        <input className="lg:w-96 bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:pl-4 md:pr-4" type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                    </label>

                    <label htmlFor="bankNumber" className="block mb-2 text-sm font-medium text-white">
                        Bank Number (optional):
                        <input className="lg:w-96 bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:pl-4 md:pr-4" type="text" name="bankNumber" value={formData.bankNumber} onChange={handleChange} />
                    </label>

                    <label htmlFor="bankName" className="block mb-2 text-sm font-medium text-white">
                        Bank Name (optional):
                        <input className="lg:w-96 bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 md:pl-4 md:pr-4"  type="text" name="bankName" value={formData.bankName} onChange={handleChange} />
                    </label>

                    
                    <button
                        type="submit"
                        className="lg:w-96 w-full text-white bg-blue2 hover:bg-blue3 focus:ring-4 focus:outline-none focus:ring-blue3 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
