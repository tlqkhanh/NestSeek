import React from "react";
import datapost from './datapost';
export default function BookingHistory() {
    return (
        <div className="flex-grow">
           <div className="flex-grow flex-col items-center justify-center pl-4 pr-4 md:pl-40 md:pr-40 lg:pl-60 lg:60">
            <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue2">Book History</h1>
            <div className="flex flex-col justify-center py-4 ">
          {datapost.map((item, index) => (
            
            <div className='flex items-center border-b border-superlight flex justify-between py-4 px-1'>
            <div className="flex flex-row items-center">
            <div><img 
                src={'https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg'}
                alt="postimg"
                className="w-10 h-10 rounded-full mr-4"/></div>
            <div className='flex flex-col'>
                <div className='sm:text-lg text-blue2'>{item.name}</div>
                <div className='text-gray-400'>{item.date}</div>
            </div>
            
            </div>
              
              <div>
                <button className='border rounded bg-bluelight p-2 hover:bg-medium text-white'>Read more</button>
              </div>
            </div>
          ))}
            </div>
            </div>
        </div>
        
    );
}
