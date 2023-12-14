import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { getPropertyDetail } from "../../action/property.action.js";
import { useParams } from 'react-router-dom';
function EditProperty() {
    const cookies = new Cookies();
    const {post_id} = useParams('post_id');
    const [Name, setName] = useState('');
    const [area,setArea] = useState(0);
    const [location, setlocation] = useState('');
    const [image, setImage] = useState('');
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState('');
    const [slot,setSlot] = useState(0);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "Name"){
            setName(value);
        }
        else if(id === "location"){
            setlocation(value);
        }
        else if(id === "image"){
            setImage(value);
        }
        else if(id === "price"){
            setPrice(value);
        }
        else if(id === "description"){
            setDescription(value);
        }
        else if(id === "area"){
            setArea(value);
        }
        else if(id === "slot"){
            setSlot(value);
        }

    }

    const handleSubmit  = () => {
        if (!cookies.get('type') && cookies.get('type')!='owner'){
            alert('Only logined owners can upload new property!!!');
            return window.location.href = '/explore'
        }

        try {
            axios.post(`http://localhost:9000/server/api/property/updateProperty.php`,{
                propertyID: post_id,
                name: Name,
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
                    "Content-Type": "application/json"
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
                console.log("Error: ", err.response.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async (post_id) => {
        try {
            axios.get(`http://localhost:9000/server/api/property/updateProperty.php?pId=${post_id}`,{
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=>{
                if (response.status>=200 && response.status<400){
                    const property = response.data.property;
                    setName(property.name);
                    setArea(property.area);
                    setlocation(property.location);
                    setDescription(property.description);
                    setImage(property.imageURL);
                    setPrice(property.price);
                    setSlot(property.initialSlot);
                }
            })
            .catch(err => {
                alert(`Error: ${err.response.data.message}`);
                window.location.href = "/explore";
                console.log(err.response);
            })
        } catch (error) {
            console.error('Error fetching property detail:', error);
        }
    };



    useEffect(()=>{
        fetchData(post_id)
    },[])

    return(
        <div className='w-full flex justify-center items-center'>
            <div className={classNames("login-wrapper flex flex-col mb-5 items-center", 'bg-bluelight rounded-xl', 'md:w-[60%] md:h-[100%] p-6 sm:w-fit sm:h-fit')}>
                <div className='font-semibold text-2xl text-darkblue lg:p-8 md:p-6 sm:p-2 text-center'>Write something about your accommodation!</div>
                <div className="form w-[70%]">
                    <div className="form-body">
                        <div className="username md:pb-4 sm:pb-2">
                            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                type="text" 
                                value={Name} onChange = {(e) => handleInputChange(e)} 
                                id="Name" 
                                placeholder="Name"
                            />
                        </div>
                        <div className="location md:pb-4 sm:pb-2">
                            <input  type="text" name="" id="location" value={location}  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    onChange = {(e) => handleInputChange(e)} 
                                    placeholder="Location"/>
                        </div>
                        <div className="area md:pb-4 sm:pb-2">
                            <input  type="number" name="" id="area" value={area}  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    onChange = {(e) => handleInputChange(e)} 
                                    placeholder="Area"/>
                        </div>
                        <div className="slot md:pb-4 sm:pb-2">
                            <input  type="number" name="" id="slot" value={slot}  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    onChange = {(e) => handleInputChange(e)} 
                                    placeholder="Number of available slot"/>
                        </div>
                        <div className="price md:pb-4 sm:pb-2">
                            <input  type="text" name="" id="price" value={price}  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    onChange = {(e) => handleInputChange(e)} 
                                    placeholder="Price"/>
                        </div>
                        <div className="image md:pb-4 sm:pb-2">
                            <input  type="url" id="image" 
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    value={image} onChange = {(e) => handleInputChange(e)} 
                                    placeholder="ImageURL"/>
                        </div>
                        <div className="description md:pb-4 sm:pb-2">
                            <textarea  type="description" id="description" 
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    value={description} onChange = {(e) => handleInputChange(e)} 
                                    rows="4"
                                    placeholder="Description"/>
                        </div>
                        
                    </div>                   
                </div>
                <div className="footer mt-5 ">
                        <button onClick={()=>handleSubmit()} type="submit" className="bg-darkblue py-2 px-4 rounded-lg text-white justify-center items-center">Submit</button>
                </div>
            </div>
        </div>
    )       
}

export default EditProperty