import classNames from "classnames";
import city_pic from "../../assets/city2.jpg"
import city_pic2 from "../../assets/houseabout.png"
export default function AboutUs() {

    return (
    <div className={classNames('flex flex-col items-center', 'px-[10%] py-4 w-full')}>
        <div className={classNames('p-4',"text-4xl text-blue2 font-bold pb-10 mb-10")}> NEST SEEK</div>
        <div className={classNames("font-semibold text-blue2")}>Welcome to Nestseek – your ultimate destination for finding ideal living spaces and business premises in Ho Chi Minh City !</div>
        <div className="w-full flex justify-center">
            <img
                src={`https://img.freepik.com/premium-photo/spectacular-digital-art-3d-illustration-eco-futuristic-city-abundant-trees_31965-48861.jpg`}
                alt="city"
                className="w-full py-4"
            />
        </div>

        <div className={classNames('p-3  ')}>
            <div className={classNames("font-bold text-blue2 text-2xl py-2")}>Our Mission</div>
            <div className="text-darkblue">At Nestseek, we're committed to bridging the gap between those seeking rental accommodations or business spaces and the perfect options available. Our mission is to streamline the process, ensuring transparency, convenience, and reliability in real estate transactions.</div>
            <div className={classNames("font-bold text-blue2 text-2xl py-2")}>Our Story</div>
            <div className="text-darkblue">Nestseek emerged from a collective desire to revolutionize how people find their ideal spaces in the bustling city of Ho Chi Minh. From a mere idea, it has evolved into a dynamic platform, connecting individuals and businesses with their perfect spaces.</div>
            <div className={classNames("font-bold text-blue2 text-2xl py-2")}>Our team</div>
            <div className="text-darkblue">Meet the passionate minds behind Nestseek! Our team comprises seasoned professionals dedicated to reshaping the real estate landscape. With a wealth of experience and unwavering commitment, we strive to make Nestseek the go-to platform for all your property needs.</div>
        </div>
        <div className="w-full">
            <img
                src={city_pic}
                alt="city"
                className="w-fit h-fit py-4"
            />
        </div>   
        <div className={classNames('p-3  ')}>
            <div className={classNames("font-bold text-blue2 text-2xl py-2")}>Core values</div>
            <div className="text-darkblue">At Nestseek, we're committed to bridging the gap between those seeking rental accommodations or business spaces and the perfect options available. Our mission is to streamline the process, ensuring transparency, convenience, and reliability in real estate transactions.</div>
            <div className={classNames("font-bold text-blue2 text-2xl py-2")}>Our Story</div>
            <div className="text-darkblue">At Nestseek, we're committed to bridging the gap between those seeking rental accommodations or business spaces and the perfect options available. Our mission is to streamline the process, ensuring transparency, convenience, and reliability in real estate transactions.</div>
            </div>    
    </div>
    );
}