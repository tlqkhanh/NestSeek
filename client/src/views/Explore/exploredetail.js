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
                <button className="bg-red hover:bg-darkred text-white font-bold sm:py-2 px-4 mr-4 mt-4 rounded">
                    Report
                </button>
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