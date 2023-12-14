import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import RatingFrame from "../../components/rating.js";
import { getPropertyDetail } from "../../action/property.action.js";
import Comment from "../../components/comment.js";
import axios from "axios";
import Cookies from "universal-cookie"
const Detail = () => {
    const cookies = new Cookies();
    const type = cookies.get('type');
    const { post_id } = useParams();

    const [postDetail, setPostDetail] = useState();

    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const renderReportModal = () => {
        return (
            <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-opacity-50 bg-gray-900 flex justify-center items-center">
                <div className="bg-white rounded-lg p-8 w-96">
                    <h2 className="text-xl font-bold mb-4">Select a reason for reporting</h2>
                    <input
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded"
                    >
                        {/* <option value="">Select a reason</option>
                        <option value="Price discrepancy">Price discrepancy</option>
                        <option value="Misleading description">Misleading description</option>
                        <option value="Fraudulent poster">Fraudulent poster</option>
                        <option value="Low-quality rental">Low-quality rental</option>
                        <option value="Unsafe environment">Unsafe environment</option> */}
                    </input>
                    <div className="flex justify-end">
                        <button
                            onClick={() => handleReportProperty(reportReason)}
                            className="bg-blue2 text-white px-4 py-2 rounded mr-2"
                        >
                            Submit Report
                        </button>
                        <button
                            onClick={() => setShowReportModal(false)}
                            className="bg-red text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const sendReport = async (type,reportedID,reportReason) => {
        const uid = cookies.get('uid')
        try {
            axios.post(`http://localhost:9000/server/api/report/createReport.php`,{
                userID: uid?uid:0,
                reason: reportReason,
                type: type,
                reportedID: reportedID,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=> {
                if (response.status>=200 && response.status<400){
                    console.log(response.data);
                }
            })
            .catch(err => {
                console.log("Error: ", err.response.data)
            })
        } catch (error) {
            console.log(error);
        }
    }
    const handleReportProperty = (reason) => {
        sendReport('property',post_id,reason);
        setReportReason('');
        setShowReportModal(false);
    };

    const fetchData = async (post_id) => {
        try {
            const response = await getPropertyDetail(post_id);
            setPostDetail(response.data.property);
        } catch (error) {
            console.error('Error fetching property detail:', error);
        }
    };


    const [postMainComment,setPostMainComment] = useState([]);
    const fetchMainComment = async (post_id) => {
        try {
            axios.get(`http://localhost:9000/server/api/comment/getParentCommentList.php?propertyID=${post_id}`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=> {
                if (response.status>=200 && response.status<400){
                    console.log(response.data.message);
                    setPostMainComment(response.data.commentList);
                }
            })
            .catch(err => {
                console.log("Error: ", err.response.data.message)
            })
          } catch (error) {
              console.log(error);
          }
    }
    const [commentText,setCommentText] = useState('');
    
    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    }

    const handleSendMainComment = () => {
        if (commentText.trim() !== '') {
            sendReply();
            fetchMainComment(post_id);
            setCommentText('');
        }
    };

    async function sendReply(){
        const uid = cookies.get('uid')
        try {
            axios.post(`http://localhost:9000/server/api/comment/createComment.php`,{
                propertyID: post_id,
                userID: uid?uid:0,
                comment: commentText,
                parentID: 0
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=> {
                if (response.status>=200 && response.status<400){
                    console.log(response.data.message);
                }
            })
            .catch(err => {
                console.log("Error: ", err.response.data)
            })
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchData(post_id);
        fetchMainComment(post_id);
    }, [])

    const handleDeleteProperty = async () =>{
        try {
            axios.post(`http://localhost:9000/server/api/property/deleteProperty.php`,
            { propertyID: post_id},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=> {
                if (response.status>=200 && response.status<400){
                    console.log(response.data.message);
                    window.location.href = "/explore";
                }
            })
            .catch(err => {
                console.log("Error: ", err.response.data.message)
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleBookProperty = async () =>{
        try {
            axios.post(`http://localhost:9000/server/api/rent/createRent.php`,
            { propertyID: post_id,
                userID: 6, //userID = cookies.get(uid)
                period: 12
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=> {
                if (response.status>=200 && response.status<400){
                    console.log(response.data);
                    //window.location.href = "/explore";
                }
            })
            .catch(err => {
                console.log("Error: ", err.response.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    

    if (!postDetail) {
        return <div>Loading...</div>;
    }


    const userType = cookies.get('type');
    const uid = cookies.get('uid');
    let userButtons;
    if (userType === 'owner' && postDetail && postDetail.owner===uid) {
        userButtons = (
            <div className="flex flex-col sm:flex-row justify-end items-center">
                <button className="bg-bluelight hover:bg-medium text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded"
                    onClick={()=>{window.location.href = `/advertise/edit/${post_id}`}}
                >
                    Edit
                </button>
                <button className="bg-red hover:bg-darkred text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded"
                    onClick={handleDeleteProperty}
                >
                    Delete
                </button>
            </div>           
        );
    } else if (userType === 'renter') {
        userButtons = (
            <div className="flex flex-col sm:flex-row justify-end items-center">
                <button className="bg-bluelight hover:bg-medium text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded"
                    onClick={handleBookProperty}
                >
                    Book
                </button>
                <button className="bg-red hover:bg-darkred text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded " onClick={() => setShowReportModal(true)}>
                    Report
                </button>
                {showReportModal && renderReportModal()}
            </div>
        );
    } else if (userType === 'admin') {
        userButtons = (
            <div className="flex justify-end items-center">
                <button className="bg-red hover:bg-darkred text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded">
                    Delete
                </button>
            </div>
        );
    }
    const customcss = `
        .icon {
            margin-right: 20px;
        }
        .search {
            border-bottom: solid 1px #86BEC2;
        }
        .top {
            margin: 70px 0px 60px 0px;
        }
        .bg-bluelight,.bg-red {
            padding: 10px 30px 10px 30px;
        }
        .content
        {
            border:solid 1px #B6DADD;
            width:60%;
        }
        .cmt
        {
            margin:50px 0 50px 0;
        }
        .comment
        {
            border-bottom:1px solid #B6DADD;
            margin:20px 0px 20px 0px;
            padding:10px 0px 10px 0px;
        }
    `;
  
    return (
        <div>
            <div className="flex-grow">
                <div className="flex flex-col sm:flex-row justify-between p-20 xl:ml-20 xl:mr-20">
                    <div className="flex items-center text-darkblue search">
                        <span className="ml-2">
                        <FaSearch className="text-bluelight icon" />
                        </span>
                        <input
                        type="text"
                        className="w-full focus:outline-none"
                        placeholder="Search..."
                        />
                    </div>
                    {type=='owner' && <Link to={"/advertise"} className="flex items-center justify-end pt-10 sm:pt-0">
                        <button className="bg-bluelight hover:bg-medium text-white font-bold py-2 px-4 rounded">
                          Advertise
                        </button>
                    </Link>}
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="flex justify-center">
                <div className="hidden lg:block">
                    <div className="flex flex-row sm:pl-20 sm:pr-20 xl:ml-20 xl:mr-20 gap-5">
                        <div className="flex justify-center items-center text-textcolor w-1/2">
                            <img
                                src={postDetail.imageURL}
                                alt={postDetail.name}
                                className="w-full"
                            />
                        </div>
                        <div className="content rounded-2xl text-darkblue p-4">
                            <h1 className="text-blue2 font-bold text-2xl">{postDetail.name}</h1>
                            <RatingFrame userType={userType} />
                            <p className="text-bluelight"><span style={{fontWeight:"bold"}}>Score: </span>{postDetail.rating}</p>
                            <p><span style={{fontWeight:"bold"}}>Author:</span> {postDetail.ownerName}</p>
                            <p><span style={{fontWeight:"bold"}}>Date: </span>{postDetail.createdDate}</p>
                            <p><span style={{fontWeight:"bold"}}>Location: </span>{postDetail.location}</p>
                            <p><span style={{fontWeight:"bold"}}>Price: </span>{postDetail.price}</p>
                            <p><span style={{fontWeight:"bold"}}>Current slot: </span>{postDetail.curSlot}</p>
                            <p><span style={{fontWeight:"bold"}}>Description: </span> {postDetail.description}</p>
                            {userButtons}
                        </div>
                    </div>
                </div>
                
                <div className="lg:hidden w-full">
                <div className="flex flex-col justify-center items-center xl:ml-20 xl:mr-20">
                        <div className="content rounded-2xl text-darkblue">
                            <div className="flex justify-center items-center text-textcolor">
                                <img
                                    src={postDetail.imageURL}
                                    alt={postDetail.name}
                                    className="w-full rounded-t-2xl"
                                />
                            </div>
                            <div className="p-4">
                                <h1 className="text-blue2 font-bold text-2xl">{postDetail.name}</h1>
                                <RatingFrame userType={userType} />
                                <p className="text-bluelight"><span style={{fontWeight:"bold"}}>Score: </span>{postDetail.rating}</p>
                                <p><span style={{fontWeight:"bold"}}>Author:</span> {postDetail.ownerName}</p>
                                <p><span style={{fontWeight:"bold"}}>Date: </span>{postDetail.createdDate}</p>
                                <p><span style={{fontWeight:"bold"}}>Price: </span>{postDetail.price}</p>
                                <p><span style={{fontWeight:"bold"}}>Location: </span>{postDetail.location}</p>
                                <p><span style={{fontWeight:"bold"}}>Description: </span> {postDetail.description}</p>
                            {userButtons}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center cmt sm:pl-20 sm:pr-20 xl:ml-20 xl:mr-20">
                <div className="grid grid-cols-1 w-full">
                    <div className="col-span-2 p-14 ">
                        <h2 className="font-bold mb-4 text-2xl text-blue2">Comment</h2> <br></br>
                        <textarea
                            className="w-full h-32 p-2 border-2 border-superlight "
                            placeholder="Type your comment here..."
                            value={commentText}
                            onChange={handleInputChange}
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button className="bg-bluelight hover:bg-medium text-white font-bold py-2 px-4 rounded"
                                onClick={handleSendMainComment}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 pl-14 pr-14 pt-8 pb-8">
                    <h2 className="font-bold mb-4 text-2xl text-blue2">Other Comments</h2>
                    {postMainComment.map((comment) => (
                        <Comment data={comment}
                    />
                    ))}
            </div>
                </div>
            </div>
            <style>{customcss}</style>
        </div>
    );
}

export default Detail;