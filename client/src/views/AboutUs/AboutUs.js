import classNames from "classnames";
export default function AboutUs() {
    // const img_url = "../src/assets/city2.jpg";

    return (
    <div className={classNames('flex flex-col items-center', 'px-[5%] py-4')}>
        <div className={classNames('p-4',"text-4xl font-bold")}> NEST SEEK</div>
        <div className={classNames("font-semibold")}>Welcome to Nestseek – your ultimate destination for finding ideal living spaces and business premises in Ho Chi Minh City !</div>
        <div className="w-full">
            <img
                src={require("./city2.jpg")}
                alt="city"
                className="w-fit h-fit py-4"
            />
        </div>
        <div className={classNames('p-3')}>
            <div className={classNames("font-bold text-2xl py-2")}>Our Mission</div>
            <div>At Nestseek, we're committed to bridging the gap between those seeking rental accommodations or business spaces and the perfect options available. Our mission is to streamline the process, ensuring transparency, convenience, and reliability in real estate transactions.</div>
            <div className={classNames("font-bold text-2xl py-2")}>Our Story</div>
            <div>Nestseek emerged from a collective desire to revolutionize how people find their ideal spaces in the bustling city of Ho Chi Minh. From a mere idea, it has evolved into a dynamic platform, connecting individuals and businesses with their perfect spaces.</div>
            <div className={classNames("font-bold text-2xl py-2")}>Our team</div>
            <div>Meet the passionate minds behind Nestseek! Our team comprises seasoned professionals dedicated to reshaping the real estate landscape. With a wealth of experience and unwavering commitment, we strive to make Nestseek the go-to platform for all your property needs.</div>
        </div>
    </div>
    );
}