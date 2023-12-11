import React from 'react';
import { Link } from 'react-router-dom';
const TableComponent = ({ data }) => {
  return (
    <div className="flex flex-col justify-center py-4">
          {data.map((item, index) => (
            <div className='border-b border-superlight flex justify-between py-4 px-1'>
              <div className='flex flex-col'>
                <div className='sm:text-lg text-blue2'>{item.name}</div>
                <div>Status</div>
                <div className='text-gray-400'>{item.date}</div>
              </div>
              <div>
                <button className='border rounded bg-bluelight p-2 hover:bg-medium text-white'>Read more</button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default TableComponent;
