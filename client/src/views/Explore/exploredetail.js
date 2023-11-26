import React from "react";
import { useParams } from "react-router-dom";
import Data from "./dataexplore.js";
import Header from "../../components/header.js";
import { FaSearch } from "react-icons/fa";
import RatingFrame from "../../components/rating.js";
const Detail = () => {
    const { post_id } = useParams();

    if (!Data) {
        return <div>Loading...</div>;
    }

    const postDetail = Data.find(item => item.id === parseInt(post_id));

    if (!postDetail) {
        return <div>Post not found</div>;
    }
    const userType = 'renter';
    let userButtons;
    if (userType === 'owner') {
        userButtons = (
            <div className="flex justify-end items-center">
                <button className="bg-bluelight hover:bg-medium text-white font-bold py-2 px-4 mr-4 mt-4 rounded">
                    Edit
                </button>
                <button className="bg-red hover:bg-darkred text-white font-bold py-2 px-4 mr-4 mt-4 rounded">
                    Delete
                </button>
            </div>           
        );
    } else if (userType === 'renter') {
        userButtons = (
            <div className="flex justify-end items-center">
                <button className="bg-bluelight hover:bg-medium text-white font-bold py-2 px-4 mr-4 mt-4 rounded">
                    Book
                </button>
                <button className="bg-red hover:bg-darkred text-white font-bold py-2 px-4 mr-4 mt-4 rounded">
                    Report
                </button>
            </div>
        );
    } else if (userType === 'admin') {
        userButtons = (
            <div className="flex justify-end items-center">
                <button className="bg-red hover:bg-darkred text-white font-bold py-2 px-4 mr-4 mt-4 rounded">
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
            padding:20px;
            border-radius:15px;
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
            <Header />
            <div className="flex justify-center">
                <div className="grid grid-cols-4 gap-5 top">
                    <div className="flex items-center text-textcolor search">
                        <span className="ml-2">
                            <FaSearch className="text-bluelight icon" />
                        </span>
                        <input
                            type="text"
                            className="w-full focus:outline-none"
                            placeholder="Search..."
                        />
                    </div>
                    <div></div>
                    <div></div>
                    <div className="flex justify-end items-center">
                        <button className="bg-bluelight hover:bg-#0E494E text-white font-bold py-2 px-4 rounded">
                            Advertise
                        </button>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex justify-end items-center text-textcolor">
                        <img
                            src={postDetail.imgUrl}
                            alt={postDetail.name}
                            style={{ width: '60%', height: 'auto' }} 
                        />
                    </div>
                    <div className="content text-darkblue">
                        <h1 className="text-blue2 font-bold text-2xl">{postDetail.name}</h1>
                        <RatingFrame userType={userType} />
                        <p className="text-bluelight"><span style={{fontWeight:"bold"}}>Score: </span>{postDetail.score}</p>
                        <p><span style={{fontWeight:"bold"}}>Author:</span> {postDetail.author}</p>
                        <p><span style={{fontWeight:"bold"}}>Date: </span>{postDetail.date}</p>
                        <p><span style={{fontWeight:"bold"}}>Price: </span>{postDetail.price}</p>
                        <p><span style={{fontWeight:"bold"}}>Location: </span>{postDetail.location}</p>
                        <p><span style={{fontWeight:"bold"}}>Description: </span> {postDetail.description}</p>
                        {userButtons}
                    </div>
                </div>
            </div>
            <div className="flex justify-center cmt">
                <div className="grid grid-cols-1 gap-5 w-full max-w-screen-lg">
                    <div className="col-span-2 p-4 ">
                        <h2 className="font-bold mb-4 text-2xl text-blue2">Comment</h2> <br></br>
                        <textarea
                            className="w-full h-32 p-2 border-2 border-superlight "
                            placeholder="Type your comment here..."
                        ></textarea>
                        <div className="flex justify-end mt-4">
                            <button className="bg-bluelight hover:bg-#0E494E text-white font-bold py-2 px-4 rounded">
                                Send
                            </button>
                        </div>
                    </div>
                    <div className="col-span-2 p-4">
                        <h2 className="font-bold mb-4 text-2xl text-blue2">Other Comments</h2>
                        <div className="comment">
                            <h2 className="text-blue1 font-bold">Username</h2>
                            <p className="text-medium">Data : dd/mm/yyyy</p>
                            <p className="text-darkblue">With meticulously designed rooms and suites, each adorned with plush furnishings and state-of-the-art amenities, our hotel offers a haven of relaxation and sophistication.</p>
                        </div>
                        <div className="comment">
                            <h2 className="text-blue1 font-bold">Username</h2>
                            <p className="text-medium">Data : dd/mm/yyyy</p>
                            <p className="text-darkblue">With meticulously designed rooms and suites, each adorned with plush furnishings and state-of-the-art amenities, our hotel offers a haven of relaxation and sophistication.</p>
                        </div>
                        <div className="comment">
                            <h2 className="text-blue1 font-bold">Username</h2>
                            <p className="text-medium">Data : dd/mm/yyyy</p>
                            <p className="text-darkblue">With  meticulously designed rooms and suites, each adorned with plush furnishings and state-of-the-art amenities, our hotel offers a haven of relaxation and sophistication.</p>
                        </div>
                    </div>
                </div>
            </div>
            <style>{customcss}</style>
        </div>
    );
}

export default Detail;