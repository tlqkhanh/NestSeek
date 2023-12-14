import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const logo ="https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
export default function Profile() {
  const { profile_id} = useParams(); // Get the values from the URL
  const [loading,setLoading] = useState(true);
  const [userName,setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bankNum, setBankNum] = useState("");
  const [bankName,setBankName] = useState("");
  const [type,setType] = useState("");
  const [rating,setRating] = useState("");
  const [status,setStatus] = useState("");

  const [location, setLocaltion] = useState("");
  const [password, setPassword] = useState("");

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

  const fetchData = async () => {
    let url = "http://localhost:9000/server/api/auth/profile.php";
    if (profile_id) url = url + `?uid=${profile_id}`;
    try {
        axios.get(url,{
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response=>{
            if (response.status>=200 && response.status<400){
                const userData = response.data.user;
                setUserName(userData.username);
                setEmail(userData.email);
                setName(userData.fullName);
                setPhone(userData.phoneNum);
                setBankNum(userData.bankNum);
                setBankName(userData.bankName);
                setType(userData.type);
                setRating(userData.rating);
                setStatus(userData.status);
                // const property = response.data.property;
                // setName(property.name);
                // setArea(property.area);
                // setlocation(property.location);
                // setDescription(property.description);
                // setImage(property.imageURL);
                // setPrice(property.price);
                // setSlot(property.initialSlot);
                setLoading(false);
            }
        })
        .catch(err => {
            alert(`Error: ${err.response.data.message}`);
            // console.log(err);
        })
    } catch (error) {
        console.error('Error fetching property detail:', error);
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

  if (loading) return <div>Loading...</div>;

  return (     
      <div className=" flex flex-col w-full bg-white rounded-lg mt-5 justify-center font-semibold text-black capitalize tracking-wide ">
        {/* Title */}
        <div className="flex justify-center">

          <h1 className="flex-1 fit tracking-wide  w-[60%] text-[30px] text-center text-emerald-700 font-semibold text-greenjustify-center mb-10">
              User Profile
          </h1>
        </div>
       
        <div className="flex justify-center ">
          <div className="flex-col justify-center bg-white rounded-xl mb-10 md:p-10 border-2">
            <div className="flex flex-row md:flex-row gap-10 justify-between mt-3">
              {/* Name */}
              <div class="py-8 px-8 max-w-sm bg-white rounded-xl  space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                <img class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="https://tailwindcss.com/img/erin-lindford.jpg" alt="Woman's Face"/>
                <div class="text-center space-y-2 sm:text-left">
                    <div class="space-y-0.5">
                        <p class="text-lg text-blue2 font-semibold">
                        User {userName}
                        </p>
                        <p class=" text-blue3 font-medium">
                        Status: {status} 
                        </p>
                        {status=="owner" && <div className="justify-items-start text-blue3 mt-5 mx-3"> Rating: {rating} </div>}
                    </div>
                </div>
            </div>
              {/* Edit */}
              <button
                  className="mr-5 bg-emerald-600 rounded-xl hover:bg-emerald-700 w-fit h-fit text-white font-bold py-2 px-4 mt-5  justify-center flex"
                  disabled={isEditing}
                  onClick={handleEditClick}
                  style={{ display: isEditing ? 'none' : 'block' }}
                >
                Edit
              </button>
            </div>
            {/* Form dâta */}
            <form className="w-full justify-between ml-5">
              <div className="flex flex-col md:flex-row gap-6 text-medium">
                  {/* Name */}
                  <div className="px-3 py-3">
                    <nav className="px-3 py-3">
                      Name
                    </nav>
                    <input
                      className="px-3 py-3 self-stretch bg-white bg-opacity-0 rounded-lg border   "
                      value={email}
                      placeholder="Input Full Name Here"
                      type="name"
                      onChange={(event) => setName(event.target.value)}
                      id="name"
                      disabled={!isEditing}
                    />
                  </div>
                  {/* Locaion */}
                  <div className="px-3 py-3 ">
                    <nav className="px-3 py-3 text-medium">
                      Type
                    </nav>
                    <input
                      className="px-3 py-3 self-stretch  bg-white bg-opacity-0 rounded-lg border   "
                      value={type}
                      type="text"
                      id="type"
                      disabled
                    />
                  </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 text-medium">
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
                    <nav className="px-3 py-3 text-medium">
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
              <div className="flex flex-col md:flex-row gap-6 text-medium">
                  {/* Name */}
                  <div className="px-3 py-3">
                    <nav className="px-3 py-3">
                      Bank 
                    </nav>
                    <input
                      className="px-3 py-3 self-stretch bg-white bg-opacity-0 rounded-lg border   "
                      value={bankName}
                      type="text"
                      placeholder="Input Bank Here"
                      onChange={(event) => setBankName(event.target.value)}
                      id="bankName"
                      disabled={!isEditing}
                    />
                  </div>
                  {/* Locaion */}
                  <div className="px-3 py-3 ">
                    <nav className="px-3 py-3 text-medium">
                      Bank Number
                    </nav>
                    <input
                      className="px-3 py-3 self-stretch  bg-white bg-opacity-0 rounded-lg border   "
                      value={bankNum}
                      type="text"
                      placeholder="Input Bank Number Here"
                      onChange={(event) => setBankNum(event.target.value)}
                      id="bankNum"
                      disabled={!isEditing}
                    />
                  </div>
              </div>
              
            </form> 
            {/* Submit Buton */}
            <div className="flex flex-col" style={{ display: isEditing ? 'block' : 'none' }}>
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
        </div>     
      </div>
  );
}


