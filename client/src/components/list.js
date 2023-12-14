import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const List = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth > 1024 && windowWidth < 1280) {
                setItemsPerPage(9); 
            } else {
                setItemsPerPage(8); 
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages =4 ;
        const showEllipsis = totalPages > maxVisiblePages;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pageNumbers.push(1, 2, 3);
                if (showEllipsis) pageNumbers.push("...", totalPages);
            } else if (currentPage >= totalPages - 1) {
                if (showEllipsis) pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
                else pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
            } else {
                if (showEllipsis) pageNumbers.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
                else pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }

        return (
            <>
                <li
                    className={`mx-1 cursor-pointer px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue3   ${currentPage === 1 ? 'bg-blue3   text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={() => {
                        if (currentPage > 1) {
                            paginate(currentPage - 1);
                        }
                    }}
                >
                    Prev
                </li>
                {pageNumbers.map((number, index) => (
                    <li
                        key={index}
                        className={`mx-1 cursor-pointer px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue3   ${currentPage === number ? 'bg-blue3   text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        onClick={() => {
                            if (Number.isInteger(number)) {
                                paginate(number);
                            }
                        }}
                    >
                        {number}
                    </li>
                ))}
                <li
                    className={`mx-1 cursor-pointer px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue3  ${currentPage === totalPages ? 'bg-blue3  text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={() => {
                        if (currentPage < totalPages) {
                            paginate(currentPage + 1);
                        }
                    }}
                >
                    Next
                </li>
            </>
        );
    };

    return (
        <div className="pb-4">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-3">
                {currentItems.map(item => (
                    <div key={item.id} className="w-64 rounded overflow-hidden shadow-lg m-3">
                        <Link to={`/explore/postDetail/${item.propertyID}`} className="block">
                            <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover" />
                            <div className="px-6 py-4 h-40 overflow-hidden">
                                <div className="font-bold text-xl text-blue1 mb-2">{item.name}</div>
                                <p className="text-bluelight text-base line-clamp-3">{item.location}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {totalPages > 1 && (
                    <ul className="flex">
                        {renderPageNumbers()}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default List;
