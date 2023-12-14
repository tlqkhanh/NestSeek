import React, { useState } from 'react';
import axios from 'axios';

const Response = () => {
    const [name, setName] = useState('');
    const [area, setArea] = useState(0);
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [slot, setSlot] = useState(0);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "Name") {
            setName(value);
        } else if (id === "location") {
            setLocation(value);
        } else if (id === "image") {
            setImage(value);
        } else if (id === "price") {
            setPrice(value);
        } else if (id === "description") {
            setDescription(value);
        } else if (id === "area") {
            setArea(value);
        } else if (id === "slot") {
            setSlot(value);
        }
    };

    const handleSubmit  = () => {
        if (!cookies.get('type') && cookies.get('type')!='owner'){
            alert('Only logined owners can upload new property!!!');
            return window.location.href = '/explore'
        }

        try {
            axios.post(`http://localhost:9000/server/api/property/addProperty.php`,{
                name: name,
                area: area,
                location: location,
                description: description,
                imageURL: image,
                price: price,
                initialSlot: slot,
                ownerID: cookies.get('uid'),
            },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response=> {
                if (response.status>=200 && response.status<400){
                    console.log(response.data);
                    alert(response.data.message);
                    window.location.href = "/explore";
                }
            })
            .catch(err => {
                alert(`Error: ${err.response.data.message}`)
                window.location.href = '/explore';
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full flex justify-center items-center'>
            <div className="login-wrapper flex flex-col mb-5 items-center bg-bluelight rounded-xl md:w-[50%] md:h-[100%] p-6 sm:w-fit sm:h-fit">
                <div className='font-semibold text-2xl text-white lg:p-8 md:p-6 sm:p-2 text-center'>Write something about your accommodation!</div>
                <form className="form w-[70%]" onSubmit={handleSubmit}>
                    <div className="form-body space-y-4">
                        <div className="">
                            <label htmlFor="Name" className="block mb-2 text-sm font-medium text-white">Name:</label>
                            <input type="text" value={name} onChange={(e) => handleInputChange(e)} id="Name" placeholder="Name" className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                        </div>
                        <div className="">
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-white">Location:</label>
                            <input type="text" value={location} onChange={(e) => handleInputChange(e)} id="location" placeholder="Location" className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                        </div>
                        <div className="">
                            <label htmlFor="area" className="block mb-2 text-sm font-medium text-white">Area:</label>
                            <input type="number" value={area} onChange={(e) => handleInputChange(e)} id="area" placeholder="Area" className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                        </div>
                        <div className="">
                            <label htmlFor="slot" className="block mb-2 text-sm font-medium text-white">Number of available slot:</label>
                            <input type="number" value={slot} onChange={(e) => handleInputChange(e)} id="slot" placeholder="Number of available slot" className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                        </div>
                        <div className="">
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">Price:</label>
                            <input type="text" value={price} onChange={(e) => handleInputChange(e)} id="price" placeholder="Price" className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                        </div>
                        <div className="">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-white">ImageURL:</label>
                            <input type="url" value={image} onChange={(e) => handleInputChange(e)} id="image" placeholder="ImageURL" className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                        </div>
                        <div className="">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Description:</label>
                            <textarea type="description" value={description} onChange={(e) => handleInputChange(e)} id="description" rows="4" placeholder="Description" className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' />
                        </div>
                    </div>
                    <div className="flex justify-center p-4">
                        <button type="submit"                         
                        className="lg:w-96 w-full text-white bg-blue2 hover:bg-blue3 focus:ring-4 focus:outline-none focus:ring-blue3 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
                        >Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Response;
