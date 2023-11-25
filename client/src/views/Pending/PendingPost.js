import classNames from "classnames";

export default function PendingPost() {
    return (
        <div className={classNames('flex flex-col items-center w-full', 'px-[5%] py-4')}>
            <div className="font-bold text-4xl py-4">Pending Post</div>
            <div className={classNames('flex flex-col gap-y-5')}>
            <div className="bg-red-500 w-full h-full border-2 shadow-lg flex">
                <div className="w-full">hehe</div>
                <div>hehe</div>
                </div>                
                <div className="bg-red-500 w-full h-full border-2 shadow-lg">
                <div>hehe</div><div>hehe</div>
                </div>
            </div>
        </div>
    )
}