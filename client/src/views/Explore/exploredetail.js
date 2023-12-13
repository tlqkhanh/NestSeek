import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Data from "./dataexplore.js";
import Header from "../../components/header.js";
import { FaSearch } from "react-icons/fa";
import RatingFrame from "../../components/rating.js";
import { getPropertyDetail } from "../../action/property.action.js";
const Detail = () => {
    const { post_id } = useParams();

    const [postDetail, setPostDetail] = useState();

    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const renderReportModal = () => {
        return (
            <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-opacity-50 bg-gray-900 flex justify-center items-center">
                <div className="bg-white rounded-lg p-8 w-96">
                    <h2 className="text-xl font-bold mb-4">Select a reason for reporting</h2>
                    <select
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        className="block w-full p-2 mb-4 border border-gray-300 rounded"
                    >
                        <option value="">Select a reason</option>
                        <option value="Price discrepancy">Price discrepancy</option>
                        <option value="Misleading description">Misleading description</option>
                        <option value="Fraudulent poster">Fraudulent poster</option>
                        <option value="Low-quality rental">Low-quality rental</option>
                        <option value="Unsafe environment">Unsafe environment</option>
                    </select>
                    <div className="flex justify-end">
                        <button
                            onClick={() => handleReport(reportReason)}
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
    const Comment = ({ username, date, text, replies, addReply }) => {
        const [replying, setReplying] = useState(false);
        const [replyText, setReplyText] = useState('');
    
        const handleReply = () => {
            if (replyText.trim() !== '') {
                addReply(username, replyText);
                setReplying(false);
                setReplyText('');
            }
        };
    
        return (
            <div className="comment">
                <div className="border border-gray rounded bg-superlight p-2">
                <h2 className="text-blue1 font-bold">{username}</h2>
                <p className="text-medium">Date: {date}</p>
                <p className="text-darkblue">{text}</p>
                </div>
                {replies && replies.length > 0 && (
                    <div className="replies">
                        <p className="font-bold text-blue3 p-4">Replies:</p>
                        {replies.map((reply, index) => (
                            <div key={index} className="reply border rounded p-2 bg-gray-100 border-gray ml-8 mt-2">
                                <h3 className="text-blue1 font-bold">{reply.username}</h3>
                                <p className="text-medium">Date: {reply.date}</p>
                                <p className="text-darkblue">{reply.text}</p>
                            </div>
                        ))}
                    </div>
                )}
                {!replying ? (
                    <button onClick={() => setReplying(true)} className="bg-blue2 text-white px-2 py-1 rounded mt-2">
                        Reply
                    </button>
                ) : (
                    <div className="mt-4 pt-2 ml-8">
                        <textarea
                            className="w-full h-20 p-2 border border-gray-300 rounded"
                            placeholder={`Reply to ${username}...`}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        ></textarea>
                        <button onClick={handleReply} className="bg-blue2 text-white px-2 py-1 rounded mt-2">
                            Send
                        </button>
                    </div>
                )}
                
            </div>
        );
    };
    
    const [comments, setComments] = useState([
        { id: 1, username: 'Username 1', date: 'dd/mm/yyyy', text: 'Comment text 1', 
        replies: [
        { id: 1, username: 'Username 1', date: 'dd/mm/yyyy', text: 'Comment text 1'},
        { id: 1, username: 'Username 1', date: 'dd/mm/yyyy', text: 'Comment text 1'},
        { id: 1, username: 'Username 1', date: 'dd/mm/yyyy', text: 'Comment text 1'}
        ] },
        { id: 2, username: 'Username 2', date: 'dd/mm/yyyy', text: 'Comment text 2', replies: [] },
    ]);

    const handleComment = (commentText) => {
        const newComment = {
            id: comments.length + 1,
            username: 'New Username', // Replace this with the actual username
            date: 'dd/mm/yyyy', // Replace this with the actual date
            text: commentText,
            replies: [
                {
                    id: 1,
                    username: 'Reply Username',
                    date: 'dd/mm/yyyy', // Thay thế bằng ngày thực tế
                    text: 'This is a reply to the new comment',
                }
            ]
        };

        setComments([...comments, newComment]);
    };

    const handleReport = (reason) => {
    
        console.log('Report reason:', reason);

        setShowReportModal(false);
    };

    const fetchData = async (post_id) => {
        try {
            const response = await getPropertyDetail(post_id);
            console.log(response.data);
            setPostDetail(response.data.property);
        } catch (error) {
            console.error('Error fetching property detail:', error);
        }
    };

    useEffect(() => {
        fetchData(post_id);
    }, [])

    // if (!Data) {
    //     return <div>Loading...</div>;
    // }


    //const postDetail = Data.find(item => item.id === parseInt(post_id));

    if (!postDetail) {
        return <div>Loading...</div>;
    }
    const userType = 'renter';
    let userButtons;
    if (userType === 'owner') {
        userButtons = (
            <div className="flex flex-col sm:flex-row justify-end items-center">
                <button className="bg-bluelight hover:bg-medium text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded">
                    Edit
                </button>
                <button className="bg-red hover:bg-darkred text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded">
                    Delete
                </button>
            </div>           
        );
    } else if (userType === 'renter') {
        userButtons = (
            <div className="flex flex-col sm:flex-row justify-end items-center">
                <button className="bg-bluelight hover:bg-medium text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded">
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
                    <div className="flex items-center justify-end pt-10 mt-10 sm:pt-0 sm:mt-0">
                        <button className="bg-bluelight hover:bg-medium text-white font-bold py-2 px-4 rounded">
                        Advertise
                        </button>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="flex justify-center">
                <div className="hidden lg:block">
                    <div className="flex flex-row sm:pl-20 sm:pr-20 xl:ml-20 xl:mr-20 gap-5">
                        <div className="flex justify-center items-center text-textcolor w-1/2">
                            <img
                                src={'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg'}
                                alt={postDetail.name}
                                className="w-full"
                            />
                        </div>
                        <div className="content rounded-2xl text-darkblue p-4">
                            <h1 className="text-blue2 font-bold text-2xl">{postDetail.name}</h1>
                            <RatingFrame userType={userType} />
                            <p className="text-bluelight"><span style={{fontWeight:"bold"}}>Score: </span>{postDetail.score}</p>
                            <p><span style={{fontWeight:"bold"}}>Author:</span> {postDetail.ownerName}</p>
                            <p><span style={{fontWeight:"bold"}}>Date: </span>{postDetail.createdDate}</p>
                            <p><span style={{fontWeight:"bold"}}>Price: </span>{postDetail.price}</p>
                            <p><span style={{fontWeight:"bold"}}>Location: </span>{postDetail.location}</p>
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
                                    src={'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg'}
                                    alt={postDetail.name}
                                    className="w-full rounded-t-2xl"
                                />
                            </div>
                            <div className="p-4">
                                <h1 className="text-blue2 font-bold text-2xl">{postDetail.name}</h1>
                                <RatingFrame userType={userType} />
                                <p className="text-bluelight"><span style={{fontWeight:"bold"}}>Score: </span>{postDetail.score}</p>
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
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button className="bg-bluelight hover:bg-medium text-white font-bold py-2 px-4 rounded">
                                Send
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 pl-14 pr-14 pt-8 pb-8">
                    <h2 className="font-bold mb-4 text-2xl text-blue2">Other Comments</h2>
                    {comments.map((comment) => (
                        <Comment
                        key={comment.id}
                        username={comment.username}
                        date={comment.date}
                        text={comment.text}
                        replies={comment.replies}
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