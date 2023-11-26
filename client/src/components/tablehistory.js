import React from 'react';
import { Link } from 'react-router-dom';
const TableComponent = ({ data }) => {
  return (
    <div className="flex justify-center">
      <table className="w-full max-w-screen-xl table-auto" style={{ border: '1px solid #86BEC2'}}>
        <thead className='bg-blue3 text-white font-bold'>
          <tr>
            <th className="px-4 py-2 w-1/3">Date</th>
            <th className="px-4 py-2 w-2/3">Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border border-bluelight px-4 py-2 text-blue3">{item.date}</td>
              <td className="border border-bluelight px-4 py-2 text-blue3"><Link>{item.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
