

import {useState } from "react";
import { useParams } from "react-router-dom";
const logo ="https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
export default function Profile() {
  const { device_id} = useParams(); // Get the values from the URL
  const [name, setName] = useState(device_id);
  const [location, setLocaltion] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };
  const handleSave = () => {
    setIsEditing(false); // Enable edit mode
  };
  const handleCancel = () => {
    setIsEditing(false); // Enable edit mode
  };

  return (     
      <div className=" flex flex-col w-full bg-white rounded-lg mt-5 justify-center font-semibold text-black capitalize tracking-wide ">
        {/* Title */}
        <div>
          <div className="flex-col w-[30%]">
          </div>
          <h1 className="flex-1 fit tracking-wide  w-[60%] underline text-[30px] text-center text-emerald-700 font-semibold text-greenjustify-center mb-10">
              User Profile
          </h1>
        </div>
       
        <div className="flex">
          <div className="flex-col w-[25%]">
          </div>
          <div className="flex-col justify-center bg-white rounded-xl mb-10 w-1/2 border-2">
            <div className="flex flex-row md:flex-row gap-10 justify-between mt-3">
              {/* Name */}
              <div className="flex px-3 items-center justify-center">
                <img
                  src={logo}
                  className="w-[30%] h-[30% ] justify-center"
                  alt="avatar"
                />
                <div className="flex-1 flex-row ">
                  <div className="justify-items-start mt-5"> Nguyen User </div>
                  <div className="justify-items-end "> Status </div>
                </div>
               
              </div>
              {/* Edit */}
              <button
                  className="mr-5 bg-emerald-600 rounded-xl hover:bg-emerald-700 w-fit h-fit text-white font-bold py-2 px-4 mt-5  justify-center flex"
                  disabled={isEditing}
                  onClick={handleEditClick}
                >
                Edit
              </button>
            </div>
            {/* Form dâta */}
            <form className="w-full justify-between ml-5">
              <div className="flex flex-col md:flex-row ">
                {/* Name */}
                <div className="px-3 py-3 font-semibold text-black capitalize tracking-wide">
                  <nav className="px-3 py-3 text-bluelight">    Name            </nav>
                  <input
                    className="px-3 py-3 self-stretch bg-white bg-opacity-0 rounded-lg border"
                    value={name}
                    placeholder="Input Name Here"
                    type="text"
                    onChange={(event) => setName(event.target.value)}
                    id="name"
                    disabled={!isEditing}
                  />
                </div>
                {/* Locaion */}
                <div className="px-3 py-3 font-semibold text-black capitalize tracking-wide ">
                  <nav className="px-3 py-3 text-bluelight">  Locaion   </nav>
                  <input
                    className="px-3 py-3 self-stretch  bg-white bg-opacity-0 rounded-lg border   "
                    value={location}
                    type="text"
                    placeholder="Input LocationHere"
                    onChange={(event) => setLocaltion(event.target.value)}
                    id="location"
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="flex-1 flex-col px-3 py-3">              
                <nav className="flex px-3 py-3 font-semibold  text-bluelight">
                  Password
                </nav>
                <input
                  className="px-3 py-3 bg-white bg-opacity-0 rounded-lg border   "
                  value={password}
                  type="password"
                  placeholder="Input password"
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 text-bluelight">
                  {/* Name */}
                  <div className="px-3 py-3">
                    <nav className="px-3 py-3">
                      Email
                    </nav>
                    <input
                      className="px-3 py-3 self-stretch bg-white bg-opacity-0 rounded-lg border   "
                      value={email}
                      placeholder="Input Email Here"
                      type="email"
                      onChange={(event) => setEmail(event.target.value)}
                      id="email"
                      disabled={!isEditing}
                    />
                  </div>
                  {/* Locaion */}
                  <div className="px-3 py-3 ">
                    <nav className="px-3 py-3 text-bluelight">
                      Phone Number
                    </nav>
                    <input
                      className="px-3 py-3 self-stretch  bg-white bg-opacity-0 rounded-lg border   "
                      value={phone}
                      type="text"
                      placeholder="Input Phone Here"
                      onChange={(event) => setPhone(event.target.value)}
                      id="phone"
                      disabled={!isEditing}
                    />
                  </div>
              </div>
            </form> 
            {/* Submit Buton */}
            <div className="flex flex-col">
              {/* Submit button */}
              <div className="flex justify-center mt-5 text-center px-3 py-3">
                <button
                  type="button"
                  className="text-white rounded-xl bg-red py-2 px-4 mr-5 hover:bg-darkred font-bold"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-emerald-600 rounded-xl hover:bg-emerald-700 text-white font-bold py-2 px-4 "
                  onClick={handleSave}
                >
                  Save Change
                </button>               
              </div>
            </div>
          </div>  
          <div className="flex-col w-[25%]">
          </div>
        </div>     
      </div>
  );
}


