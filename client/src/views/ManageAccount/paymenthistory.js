import React from "react";
import datapost from './datapost';
export default function PaymentHistory() {
    return (
        <div className="flex-grow">
           <div className="flex-grow flex-col items-center justify-center pl-4 pr-4 md:pl-40 md:pr-40 lg:pl-60 lg:60">
            <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue2">Payment History</h1>
            <div className="flex flex-col justify-center py-4">
          {datapost.map((item, index) => (
            <div className='flex items-center border-b border-superlight flex justify-between py-4 px-1'>
              <div className='flex flex-col'>
                <div className='sm:text-lg text-blue2'>{item.name}</div>
                <div style={{ margin: "10px 0 10px" }}> Status : <span className={item.pay ? "text-green-500" : "text-red"}>{item.pay ? "Paid" : "Unpaid"}</span></div>
                <div className='text-gray-400'>{item.date}</div>
              </div>
              <div>
                {item.pay ?
                <button className='border rounded bg-bluelight p-2 hover:bg-medium text-white'>Read more</button>
                :
                <button className='border rounded bg-blue3 p-2 hover:bg-blue2 text-white'>Pay Now</button>
                }
              </div>
            </div>
          ))}
            </div>
            </div>
        </div>
        
    );
}
