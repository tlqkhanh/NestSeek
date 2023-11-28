import React from "react";
import { Link } from "react-router-dom";

const List = ({ data }) => {
    return (
        <div className="grid grid-cols-4 gap-5">
            {data.map(item => (
                <div key={item.id} className="w-64 rounded overflow-hidden shadow-lg">
                    <Link to={`/postDetail/${item.id}`} className="block">
                        <img src={item.imgUrl} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="px-6 py-4 h-40 overflow-hidden">
                            <div className="font-bold text-xl text-blue1 mb-2">{item.name}</div>
                            <p className="text-bluelight text-base line-clamp-3">{item.description}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default List;

