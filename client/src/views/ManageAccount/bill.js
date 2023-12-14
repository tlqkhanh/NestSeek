import React from "react";
import momo from "../../assets/momo.png";
export default function Bill() {
    const ispay = false; 
    const statusText = ispay ? "Paid" : "Unpaid";
    const statusColor = ispay ? "text-green-500" : "text-red";

    

    return (
        <div className="w-screen sm:pl-20 sm:pr-20 sm:m-10">
            <div className="flex justify-center pb-20 text-blue1 font-bold text-4xl"><h1>Your Bill</h1></div>
            <div className="flex flex-col md:flex-row lg:mr-10 lg:ml-10 xl:mr-15 xl:mr-15 xl:pr-10 xl:pl-10">
                <div className="md:w-1/2 border border-gray-300 rounded-xl p-4 m-4">
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
                <div className="md:w-1/2 flex justify-center m-4">
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
            
        </div>
    );
}
