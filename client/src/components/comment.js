import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie"
const Comment = ({data}) => {
    const { post_id } = useParams();
    const cookies = new Cookies();
    const [replying, setReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replies, setReplies] = useState([]);

    const handleReply = () => {
        if (replyText.trim() !== '') {
            sendReply();
            fetchReply();
            setReplying(false);
            setReplyText('');
        }
    };


    async function sendReply(){
        const uid = cookies.get('uid')
        try {
            axios.post(`http://localhost:9000/server/api/comment/createComment.php`,{
                propertyID: post_id,
                userID: uid?uid:0,
                comment: replyText,
                parentID: data.commentID
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
                console.log("Error: ", err.response.data.message)
                alert(`Error: ${err.response.data.message}`);
            })
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchReply(){
        try {
            axios.get(`http://localhost:9000/server/api/comment/getChildCommentList.php?parentID=${data.commentID}`,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response=> {
                if (response.status>=200 && response.status<400){
                    setReplies(response.data.commentList);
                }
            })
            .catch(err => {
                console.log("Error: ", err.response.data.message)
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchReply();
    }, [])

    return (
        <div className="comment">
            <div className="border border-gray rounded bg-superlight p-2">
            <h2 className="text-blue1 font-bold">{data.full_name}</h2>
            <p className="text-medium">Date: {data.comment_time}</p>
            <p className="text-darkblue">{data.comment}</p>
            </div>
            {replies && replies.length > 0 && (
                <div className="replies">
                    <p className="font-bold text-blue3 p-4">Replies:</p>
                    {replies.map((reply, index) => (
                        <div key={index} className="reply border rounded p-2 bg-gray-100 border-gray ml-8 mt-2">
                            <h3 className="text-blue1 font-bold">{reply.full_name}</h3>
                            <p className="text-medium">Date: {reply.comment_time}</p>
                            <p className="text-darkblue">{reply.comment}</p>
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
                        placeholder={`Reply to ${data.full_name}...`}
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

export default Comment;