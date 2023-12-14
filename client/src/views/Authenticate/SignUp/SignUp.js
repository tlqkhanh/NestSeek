import React, { useState } from 'react';

const SignUp = () => {
    const [mssv, setMssv] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;

        switch (id) {
            case 'mssv':
                setMssv(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'accept':
                setAcceptTerms(checked);
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(mssv, name, email, password, acceptTerms);
    };

    return (
        <div className="flex flex-grow justify-center">
            <div className="w-full max-w-md p-8 bg-bluelight border border-gray-200 rounded-lg shadow-sm">
                <form className="space-y-6 p-6" onSubmit={handleSubmit}>
                <div className='flex justify-center'>
                    <h5 className="text-2xl font-bold  text-white">Sign Up</h5>
                    </div>
                    <div>
                        <label htmlFor="mssv" className="block mb-2 text-sm font-medium  text-white">MSSV</label>
                        <input
                            type="text"
                            name="mssv"
                            id="mssv"
                            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:p-3"
                            placeholder=""
                            value={mssv}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium  text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:p-3"
                            value={name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-white">Phone Number</label>
                        <input
                            type="email"
                            name="email"
                            id="phonenumber"
                            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:p-3"
                            value={email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 sm:p-3"
                            value={password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="accept"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                                    checked={acceptTerms}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <label htmlFor="accept" className="ms-2 text-sm font-medium  text-gray-100">Accept terms</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white bg-blue3 hover:bg-blue2 focus:ring-4 focus:outline-none focus:ring-blue1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        SignUp
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default SignUp;
