import React from "react";
import datapost from './datapost';
import Tablebooking from '../../components/tablehistory';
import Header from "../../components/header";
export default function BookingHistory() {
    return (
        <div className="flex-grow">
           <div className="flex-grow flex-col items-center justify-center pl-60 pr-60">
            <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue2">Booking History</h1>
            <Tablebooking data={datapost}></Tablebooking>
            </div>
        </div>
        
    );
}
