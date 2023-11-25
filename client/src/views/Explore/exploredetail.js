import React from "react";
import { useParams } from "react-router-dom";
import Data from "./dataexplore.js";
import Header from "../../components/header.js";
import { FaSearch } from "react-icons/fa";

const Detail = () => {
    const { post_id } = useParams();

    if (!Data) {
        return <div>Loading...</div>;
    }

    const postDetail = Data.find(item => item.id === parseInt(post_id));

    if (!postDetail) {
        return <div>Post not found</div>;
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
        .bg-bluelight {
            padding: 10px 30px 10px 30px;
        }
        .content
        {
            border:solid 1px #86BEC2;
            padding:20px;
            border-radius:15px;
            width:50%;
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
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex justify-end items-center text-textcolor">
                        <img
                            src={postDetail.imgUrl}
                            alt={postDetail.name}
                            style={{ width: '50%', height: 'auto' }} 
                        />
                    </div>
                    <div className="content">
                        <h1 className="text-blue1 font-bold">{postDetail.name}</h1>
                        <p className="text-bluelight"><span style={{fontWeight:"bold"}}>Score: </span>{postDetail.score}</p>
                        <p><span style={{fontWeight:"bold"}}>Author:</span> {postDetail.author}</p>
                        <p><span style={{fontWeight:"bold"}}>Date: </span>{postDetail.date}</p>
                        <p><span style={{fontWeight:"bold"}}>Price: </span>{postDetail.price}</p>
                        <p><span style={{fontWeight:"bold"}}>Location: </span>{postDetail.location}</p>
                        <p><span style={{fontWeight:"bold"}}>Description: </span> {postDetail.description}</p>
                    </div>
                </div>
            </div>
            <style>{customcss}</style>
        </div>
    );
}

export default Detail;