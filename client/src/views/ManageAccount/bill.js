import React, { useEffect, useState } from "react";
import momo from "../../assets/momo.png";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Bill() {
    const {bill_id} = useParams('bill_id');
    const [ispay, setIsPay] = useState('');
    const statusText = ispay=='paid' ? "Paid" : "Unpaid";
    const statusColor = ispay=='paid' ? "text-green-500" : "text-red";

    const [billDetail, setbillDetail] = useState();

  async function getbillDetail() {
    try {
      axios
        .get(
          `http://localhost:9000/server/api/bill/getBillDetail.php?billId=${bill_id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status >= 200 && response.status < 400) {
            console.log(response.data);
            setbillDetail(response.data.bill);
            setIsPay(response.data.bill.status)
          }
        })
        .catch((err) => {
          console.log("Error: ", err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePay(bill_id){
    try {
        axios.post(
            `http://localhost:9000/server/api/bill/payBill.php`,
            {
                billId: bill_id,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            if (response.status >= 200 && response.status < 400) {
              console.log(response.data);
              alert(response.data.message);
              window.location.href = '/my/payment-history';
            }
          })
          .catch((err) => {
            console.log("Error: ", err.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    getbillDetail();
  }, []);

  if (!billDetail ) return <div>Loading...</div>
    

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
                    <div style={{ margin: "10px 0 10px" }}>Renter name : {billDetail.renterName}</div>
                    <div style={{ marginBottom: "10px" }}>Owner name : {billDetail.ownerName}</div>
                    <div style={{ marginBottom: "10px" }}>Booking time : {billDetail.created_date}</div>
                    
                </div>
                <div className="md:w-1/2 flex justify-center m-4">
                    <div className="border rounded bg-bgcolor h-full w-full p-4">
                    <span className="font-bold text-xl text-blue2" >Bill for {billDetail.name}</span>
                    <div style={{ margin: "10px 0 10px" }}>Bill ID : {billDetail.billID}</div>
                    <div style={{ marginBottom: "10px" }}>Rental period : {billDetail.period} month(s)</div>
                    <div style={{ marginBottom: "10px" }}>Cost : {billDetail.initial_amount}</div>
                    <div style={{ marginBottom: "10px" }} className="border-b pb-4 border-gray-700">Tax : {billDetail.tax*100}%</div>
                    <div style={{ margin: "10px 0 10px" }}>Bill Now : {billDetail.total_amount}</div>
                    {ispay!='paid' && (
                        <div className="p-4 flex justify-center">
                            <button className="bg-blue3 hover:bg-blue2 text-white font-bold py-2 px-4 rounded"
                                onClick={()=>handlePay(billDetail.billID)}
                            >
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
