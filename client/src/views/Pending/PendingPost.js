import classNames from "classnames";
import { useEffect } from "react";

export default function PendingPost() {
    const post = [
        {
            id: 'id_1',
            title: 'Name Name Name',
            // pic_url: require('../../assets/homepage4.png'),
            pic_url: 'homepage4.png',
            score: '4.5/5',
            author: 'ABC Hotel',
            date: '1/12/2023',
            location: 'Thu Duc City, Ho Chi Minh City',
            price: '10000000',
            description: 'Discover the epitome of luxury and comfort at our hotel available for rent. This exquisite property boasts a blend of modern elegance and timeless charm, providing a welcoming retreat for guests seeking a memorable stay. With meticulously designed rooms and suites, each adorned with plush furnishings and state-of-the-art amenities, our hotel offers a haven of relaxation and sophistication. Nestled in a prime location, our hotel is perfect for those looking to host events, conferences, or simply unwind in a lavish setting. The spacious common areas, including a stylish lobby and inviting dining spaces, create an inviting atmosphere for both business and leisure travelers.'
        },
        {
            id: 'id_2',
            title: 'Name Name 2',
            // pic_url: require('../../assets/homepage4.png'),
            pic_url: 'city2.jpg',
            score: '4.5/5',
            author: 'ABC Hotel',
            date: '1/12/2023',
            location: 'Thu Duc City, Ho Chi Minh City',
            price: '10000000',
            description: 'Discover the epitome of luxury and comfort at our hotel available for rent. This exquisite property boasts a blend of modern elegance and timeless charm, providing a welcoming retreat for guests seeking a memorable stay. With meticulously designed rooms and suites, each adorned with plush furnishings and state-of-the-art amenities, our hotel offers a haven of relaxation and sophistication. Nestled in a prime location, our hotel is perfect for those looking to host events, conferences, or simply unwind in a lavish setting. The spacious common areas, including a stylish lobby and inviting dining spaces, create an inviting atmosphere for both business and leisure travelers.'
        }
    ];
    const IMG = (imgName) => {
        return require(`../../assets/${imgName}`)
    };
    // console.log(IMG(post[0].pic_url))
    const clicked = (id) => {
        console.log(id + "clicked")
    };

    return (
        <div className={classNames('flex flex-col items-center w-full h-full overflow-auto', 'px-[5%] py-4')}>
            <div className="font-bold text-4xl text-darkblue ">Pending Post</div>

            <div className={classNames('flex flex-wrap items-center justify-evenly', 'w-full h-fit gap-y-5 py-6')}>
                {post.map((data, index) => (
                    <div key={index} className={classNames('lg:w-[45%] md:w-[90%] h-full flex', 'shadow-lg rounded-xl border')}>
                        <div className="w-full h-fit flex flex-col justify-center items-center">
                            <div className={classNames("w-[100%] flex flex-row")}> 
                                <div className="object-fill w-[50%]">
                                    <img src={IMG(data.pic_url)} className="rounded-tl-xl object-contain"/>
                                </div>
                                <div className="w-[50%] rounded-tr-xl p-4 flex flex-col justify-between">
                                    <div className={classNames('text-xl font-bold text-darkblue', 'py-3')}>{data.title}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Score: ' + data.score}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Author: ' + data.author}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Date: ' + data.date}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Locaion: ' + data.location}</div>
                                    <div className={classNames('text-sm font-semibold text-blue1')}>{'Price: ' + data.price + ' Vnd'}</div>
                                </div>
                            </div>
                            <div className="py-4 px-2">
                                <div className={classNames('font-semibold text-blue1')}>{'Description:'}</div>
                                <div>{data.description}</div>
                            </div>
                            <div className="flex justify-end w-full px-4 py-2">
                                <button className="py-2 px-3 bg-blue3 text-white font-semibold rounded-lg hover:bg-blue1" onClick={() => clicked(data.id)}>Approve</button>
                            </div>
                        </div>
                    </div>    
                ))}
            </div>
        </div>
    )
}