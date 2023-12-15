import classNames from "classnames";
import { useState, useEffect } from "react";
import axios from "axios";

export default function  PendingPost() {
    const [pendingList, setPendingList] = useState([]);

    const fetchData = async () => {
        try {
          axios.get(`http://localhost:9000/server/api/admin/getPendingPropertyList.php`,
          {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then(response=> {
              if (response.status>=200 && response.status<400){
                  console.log(response.data.message);
                  setPendingList(response.data.propertyList);
                  console.log(response.data.propertyList);
              }
          })
          .catch(err => {
              console.log("Error: ", err.response.data.message)
          })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchData();
    },[])

    
    // console.log(IMG(post[0].pic_url))
    const handleAdminAction = (status,propertyID) => {
        try {
            axios.post(`http://localhost:9000/server/api/admin/actionToProperty.php`,{
                propertyID: propertyID,
                status: status
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
                    fetchData()
                }
            })
            .catch(err => {
                alert(`Error: ${err.response.data.message}`)
                console.log(err.response)
                //window.location.href = '/explore';
            })
        } catch (error) {
            console.log(error);
        }
    };

    if (!pendingList || pendingList.length === 0) return <div>There is no pending property</div>;

    return (
        <div className={classNames('flex flex-col items-center w-full h-full overflow-auto', 'px-[5%] py-4')}>
            <div className="font-bold text-4xl text-blue2 ">Pending Post</div>

            <div className={classNames('flex flex-wrap items-center justify-evenly', 'w-full h-fit gap-y-5 py-6')}>
                {pendingList.map((data, index) => (
                    <div key={index} className={classNames('lg:w-[45%] md:w-[90%] h-full flex', 'shadow-lg rounded-xl border')}>
                        <div className="w-full h-fit flex flex-col justify-center items-center">
                            <div className={classNames("w-[100%] flex flex-row ")}> 
                                <div className="w-[50%] p-4 flex flex-col justify-between mt-5">
                                    <img src={data.imageURL} alt="post_pic" className="rounded-xl object-contain "/>
                                </div>
                                <div className="w-[50%] rounded-tr-xl p-4 flex flex-col justify-between">
                                    <div className={classNames('text-xl font-bold text-blue3', 'py-3')}>{data.name}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Author: ' + data.user_name}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Date: ' + data.createdDate}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Locaion: ' + data.location}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Price: ' + data.price + ' $'}</div>
                                </div>
                            </div>
                            <div className="py-4 px-2 flex justify-start">
                                <div className={classNames('font-semibold text-blue1 text-center' )}>{'Description'}</div>
                                <div className={classNames('text-justify text-indent-5 pl-5 pr-5')}>{data.description}</div>
                            </div>
                            <div className="flex justify-end w-full px-4 py-2">
                                <button className="py-2 px-3 bg-blue3 text-white font-semibold rounded-lg hover:bg-blue1 m-4" onClick={() => handleAdminAction('published',data.propertyID)}>Approve</button>
                                <button className="py-2 px-3 bg-red text-white font-semibold rounded-lg m-4" onClick={() => handleAdminAction('rejected',data.propertyID)}>Reject</button>
                            </div>
                        </div>
                    </div>    
                ))}
            </div>
        </div>
    )
}