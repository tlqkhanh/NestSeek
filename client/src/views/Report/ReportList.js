import classNames from "classnames";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Report() {
    const [reportList, setreportList] = useState([]);

    const handleReport = async (accept, reportID, reportedID) =>{
        try {
            axios.post(`http://localhost:9000/server/api/admin/actionToReport.php`,{
                propertyID: reportedID,
                accept: accept,
                reportID: reportID,
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
    }

    const fetchData = async () => {
        try {
          axios.get(`http://localhost:9000/server/api/admin/getReportList.php`,
          {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
          })
          .then(response=> {
              if (response.status>=200 && response.status<400){
                  console.log(response.data.message);
                  setreportList(response.data.reportList);
                  console.log(response.data.reportList);
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

    
    if (!reportList || reportList.length === 0) return <div>There is no pending property</div>;
    
    return (
        <div className={classNames('flex flex-col items-center w-full', 'px-[5%] py-4')}>
            <div className="font-bold text-4xl py-4">Report List</div>

            <div className="relative overflow-x-auto w-full py-6 px-4">
                <table className="w-full text-gray-500 text-base ">
                    <thead className="text-lg text-gray-700 uppercase bg-gray-50  text-center">
                        <tr>
                            <th scope="col" className="px-6 py-4  border-x">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-4 border-x">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4  border-x">
                                Post
                            </th>
                            <th scope="col" className="px-6 py-4  border-x">
                                Reason
                            </th>
                            <th scope="col" className="py-4  border-x">
                                {/* <TrashIcon className="w-6 h-6"/> */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList.map((report, index) => (
                            <tr className="bg-white border-b " key={index}>
                                <th scope="row" className="px-6 ml-15 py-3 font-medium text-gray-900 whitespace-nowrap text-justify">
                                    <p className="">{report.user_name}</p>
                                </th>
                                <td className="px-6 py-3 border-x">
                                    {report.report_date}
                                </td>
                                <td className="px-6 py-3 border-x flex justify-center">
                                    <Link to={`/explore/postDetail/${report.reportedID}`}>
                                        <div className="w-fit hover:text-blue-600 cursor-pointer hover:underline text-left">{report.property_name}</div>
                                    </Link>
                                    
                                </td>
                                <td className="px-6 py-3 border-x">
                                    {report.reason}
                                </td>
                                <td className="px-6 py-3 border-x flex">
                                    <button className="py-3 bg-white hover:bg-white rounded-xl w-full flex justify-center "
                                        onClick={()=>handleReport(true,report.reportID,report.reportedID)}
                                    >
                                        Accept                                        
                                    </button>
                                    <button className="py-3 bg-white hover:bg-white rounded-xl w-full flex justify-center "
                                        onClick={()=>handleReport(false,report.reportID,report.reportedID)}
                                    >
                                        Reject<TrashIcon className="w-6 h-6 text-red "/>                                        
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>);
}