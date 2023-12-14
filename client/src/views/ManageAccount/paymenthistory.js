import React, { useEffect, useState } from "react";
import datapost from "./datapost";
import Cookies from "universal-cookie";
import axios from "axios";

export default function PaymentHistory() {
  const cookies = new Cookies();
  const uid = cookies.get("uid");
  const [billList, setBillList] = useState([]);

  async function getBillList() {
    try {
      axios
        .get(
          `http://localhost:9000/server/api/bill/getBillList.php?user=${uid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status >= 200 && response.status < 400) {
            console.log(response.data.message);
            setBillList(response.data.billList);
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
    getBillList();
  }, []);

  if (billList && billList.length === 0) {
    return (
      <div className="flex-grow">
        <div className="flex-grow flex-col items-center justify-center pl-4 pr-4 md:pl-40 md:pr-40 lg:pl-60 lg:60">
          <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue2">
            Payment History
          </h1>
          <div className="flex flex-col justify-center py-4">
            There is no bills
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      <div className="flex-grow flex-col items-center justify-center pl-4 pr-4 md:pl-40 md:pr-40 lg:pl-60 lg:60">
        <h1 className="text-3xl font-bold mb-6 flex justify-center text-blue2">
          Payment History
        </h1>
        <div className="flex flex-col justify-center py-4">
          {billList.map((item, index) => (
            <div className="flex items-center border-b border-superlight flex justify-between py-4 px-1">
              <div className="flex flex-col">
                <div className="sm:text-lg text-blue2">{item.name}</div>
                <div style={{ margin: "10px 0 10px" }}>
                  {" "}
                  Status :{" "}
                  <span className={item.status==='paid' ? "text-green-500" : "text-red"}>
                    {item.status}
                  </span>
                </div>
                <div className="text-gray-400">{item.createdDate}</div>
              </div>
              <div>
                {item.status === 'paid' ? (
                  <button className="border rounded bg-bluelight p-2 hover:bg-medium text-white">
                    Read more
                  </button>
                ) : (
                  <button className="border rounded bg-blue3 p-2 hover:bg-blue2 text-white">
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
