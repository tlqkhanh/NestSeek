import classNames from 'classnames';
import React, {useState} from 'react';
function Response() {
    
    const [Name, setName] = useState(null);
    const [lococation, setlococation] = useState(null);
    const [image, setImage] = useState(null);
    const [price,setPrice] = useState(null);
    const [description,setDescription] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "Name"){
            setName(value);
        }
        if(id === "lococation"){
            setlococation(value);
        }
        if(id === "image"){
            setImage(value);
        }
        if(id === "price"){
            setPrice(value);
        }
        if(id === "description"){
            setDescription(value);
        }

    }

    const handleSubmit  = () => {
        console.log(Name,lococation,image,price,description);
    }

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
                        <div className="lococation md:pb-4 sm:pb-2">
                            <input  type="text" name="" id="lococation" value={lococation}  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:shadow-darkblue' 
                                    onChange = {(e) => handleInputChange(e)} 
                                    placeholder="Lococation"/>
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
                                    placeholder="Image"/>
                        </div>
                        <div className="description md:pb-4 sm:pb-2">
                            <textarea  type="description" id="descriptionl" 
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

export default Response