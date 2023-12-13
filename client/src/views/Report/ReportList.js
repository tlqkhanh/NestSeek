import classNames from "classnames";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Report() {
    const report =[
        {
          username: "NguyenVanA",
          date: "2023-11-25",
          post: "https://example.com/bai-viet-nguyen-van-a"
        },
        {
          username: "TranThiB",
          date: "2023-11-24",
          post: "https://example.com/bai-viet-tran-thi-b"
        },
        {
          username: "LeDucC",
          date: "2023-11-23",
          post: "https://example.com/bai-viet-le-duc-c"
        },
        {
          username: "PhamMinhD",
          date: "2023-11-22",
          post: "https://example.com/bai-viet-pham-minh-d"
        }
      ];
      
    return (
        <div className={classNames('flex flex-col items-center w-full', 'px-[5%] py-4')}>
            <div className="font-bold text-4xl py-4">Report List</div>

            <div className="relative overflow-x-auto w-full py-6 px-4">
                <table className="w-full text-gray-500 text-base ">
                    <thead className="text-lg text-gray-700 uppercase bg-gray-50  text-center">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-4 border-x">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Post
                            </th>
                            <th scope="col" className="py-4">
                                {/* <TrashIcon className="w-6 h-6"/> */}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map((report, index) => (
                            <tr className="bg-white border-b " key={index}>
                                <th scope="row" className="px-6 ml-15 py-3 font-medium text-gray-900 whitespace-nowrap text-justify">
                                    <p className="">{report.username}</p>
                                </th>
                                <td className="px-6 py-3 border-x">
                                    {report.date}
                                </td>
                                <td className="px-6 py-3 border-x flex justify-center">
                                    <div className="w-fit hover:text-blue-600 cursor-pointer hover:underline text-left">{report.post}</div>
                                </td>
                                <td className="w-[10%] border-x">
                                    <button className="py-3 bg-white hover:bg-white rounded-xl w-full flex justify-center ">
                                        <TrashIcon className="w-6 h-6 text-red "/>                                        
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>);
}