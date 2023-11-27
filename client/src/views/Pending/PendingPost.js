import classNames from "classnames";
import pic from "../../assets/homepage4.png";

export default function PendingPost() {
    return (
        <div className={classNames('flex flex-col items-center w-full h-full overflow-auto', 'px-[5%] py-4')}>
            <div className="font-bold text-4xl py-4">Pending Post</div>

            <div className={classNames('flex flex-wrap items-center justify-evenly gap-y-[3%]', 'w-full h-fit')}>
                <div className="bg-red-500 lg:w-[45%] md:w-[90%] h-full border-2 shadow-lg flex">
                    <div className="w-full h-fit flex">
                        <img src={pic} className="object-cover w-1/2"/>
                        <div className="w-1/2">hehe</div>
                    </div>
                </div>                
                <div className="bg-green-500 lg:w-[45%] md:w-[90%] h-full border-2 shadow-lg flex">
                    <div className="w-full h-fit flex">
                        <img src={pic} className="object-cover w-1/2"/>
                        <div className="w-1/2">hehe</div>
                    </div>
                </div>  
            </div>
        </div>
    )
}