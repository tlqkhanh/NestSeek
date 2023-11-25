import React from "react";
import { Link } from "react-router-dom";

const List = ({ data }) => {
    const customcss = `
        .grid {
            border-radius: 15px;
        }
    `;

    return (
        <div className="grid grid-cols-4 gap-5">
            {data.map(item => (
                <Link to={`postDetail/${item.id}`} key={item.id} className="w-64 rounded overflow-hidden shadow-lg">
                    <img src={item.imgUrl} alt={item.name} className="w-full h-48 object-cover" />
                    <div className="px-6 py-4 h-40 overflow-hidden">
                        <div className="font-bold text-xl text-#0E494E mb-2">{item.name}</div>
                        <p className="text-bluelight text-base  line-clamp-3">{item.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default List;
