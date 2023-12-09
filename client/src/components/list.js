import React from "react";
import { Link } from "react-router-dom";

const List = ({ data }) => {
    return (
        <div className="flex flex-wrap justify-between sm:pl-20 sm:pr-20 md:pl-10 md:pr-10 lg:pl-12 lg:pr-12">
            {data.map(item => (
                <div key={item.id} className="w-64 rounded overflow-hidden shadow-lg m-3">
                    <Link to={`postDetail/${item.propertyID}`} className="block">
                        <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="px-6 py-4 h-40 overflow-hidden">
                            <div className="font-bold text-xl text-blue1 mb-2">{item.name}</div>
                            <p className="text-bluelight text-base line-clamp-3">{item.location}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default List;

