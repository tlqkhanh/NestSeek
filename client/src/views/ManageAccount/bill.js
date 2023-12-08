import React from "react";
import momo from "../../assets/momo.png";
export default function Bill() {
    const ispay = false; 
    const statusText = ispay ? "Paid" : "Unpaid";
    const statusColor = ispay ? "text-green-500" : "text-red";

    return (
        <div className="grid grid-cols-5 w-screen pl-20 pr-20 m-10 gap-x-4">
            <div className="col-span-5 flex justify-center pb-20 text-blue1 font-bold text-4xl"><h1>Your Bill</h1></div>
            <div className="col-span-3 border border-gray-300 rounded-xl p-4">
                <span className="font-bold text-xl text-blue2" >Payment Detail</span>
                <div style={{ margin: "10px 0 10px" }}>Status : <span className={statusColor}>{statusText}</span></div>
                <div className="flex flex-row items-center border-b border-gray-300 pb-6">Payment method : 
                <div className="w-12 h-12 ml-4">
                        <img
                            src={momo}
                            alt="payment method"
                        />
                </div> </div>
                <div style={{ margin: "10px 0 10px" }}>Renter name : </div>
                <div style={{ marginBottom: "10px" }}>Owner name : </div>
                <div style={{ marginBottom: "10px" }}>Booking time : </div>
                
            </div>
            <div className="col-span-2 flex justify-center">
                <div className="border rounded bg-bgcolor h-full w-full p-4">
                <span className="font-bold text-xl text-blue2" >Property name</span>
                <div style={{ margin: "10px 0 10px" }}>Bill ID : </div>
                <div style={{ marginBottom: "10px" }}>Rental period : </div>
                <div style={{ marginBottom: "10px" }}>Subtotal : </div>
                <div style={{ marginBottom: "10px" }} className="border-b pb-4 border-gray-700">Tax : </div>
                <div style={{ margin: "10px 0 10px" }}>Bill Now : </div>
                {!ispay && (
                    <div className="p-4 flex justify-center">
                        <button className="bg-blue3 hover:bg-blue2 text-white font-bold py-2 px-4 rounded">
                            Pay Now
                        </button>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}
