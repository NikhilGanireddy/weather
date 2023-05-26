import React, {useEffect, useState} from "react";
import axios from "axios";
import {UilFidgetSpinner, UilSpinner} from "@iconscout/react-unicons";
import {
    BsCloudDrizzle,
    BsCloudDrizzleFill,
    BsCloudHaze2Fill,
    BsEye,
    BsThermometer,
    BsWater,
    BsWind,
    ImSpinner2,
    IoMdCloudy,
    IoMdRainy,
    IoMdSearch,
    IoMdSnow,
    IoMdSunny,
    IoMdThunderstorm,
    TbTemperatureCelsius,
} from "react-icons/all.js";

const App = () => {
    const APIKEY = "5b56d0d2a828676a337904fef5a06cca";

    const [data, setData] = useState(null);
    const [location, setLocation] = useState("Vijayawada");
    const [inputValue, setInputValue] = useState("");
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrorMsg] = useState("");


    const handleInput = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue === "") {
            setAnimate(true);
            setTimeout(() => {
                setAnimate(false);
            }, 5000);
        }

        if (inputValue !== "") {
            setLocation(inputValue);
        }
        document.querySelector("input").value = "";
        console.log(inputValue);
    };

    useEffect(() => {
        setLoading(true);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKEY}`;
        axios.get(url).then((res) => setTimeout(() => {
            setData(res.data);
            setLoading(false);
        }, 1000)).catch(err => {
            setLoading(false);
            setErrorMsg(err)
        });
    }, [location]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrorMsg("")
        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }, [errMsg])

    if (!data) {
        return (<div className={` w-screen h-screen flex justify-center items-center bg-gradient`}>
            <div
                className={`text-white text-6xl animate-spin flex justify-center items-center`}
            >
                <ImSpinner2/>
            </div>
        </div>);
    }

    let icon;
    // console.log(data.weather[0].main)

    switch (data.weather[0].main) {
        case "Clouds":
            icon = <IoMdCloudy className={` text-sky-500`} />;
            break;
        case "Haze":
            icon = <BsCloudHaze2Fill  className={` text-sky-500`}/>;
            break;
        case "Rain":
            icon = <IoMdRainy className={` text-sky-500`}/>;
            break;
        case "Clear":
            icon = <IoMdSunny  className={` text-yellow-400`}/>;
            break;
        case "Drizzle":
            icon = <BsCloudDrizzleFill/>;
            break;
        case "Snow":
            icon = <IoMdSnow className={` text-sky-500`}/>;
            break;
        case "Thunderstorm":
            icon = <IoMdThunderstorm/>;
            break;
    }

    const date = new Date();

    return (<div
        className={` w-full px-4 lg:px-0 h-screen bg-gradient flex items-center justify-center flex-col`}
    >
        {errMsg && <div
            className={` max-w-[90vw] text-white absolute top-2 lg:top-10 lg:max-w-[450px] w-full p- bg-[#3FA2C1] p-4 rounded-lg capitalize`}>{errMsg.response.data.message}</div>}
        <form
            className={` ${animate ? "animate-shiver" : ""} h-16 max-w-[450px] w-full bg-black/30 mb-8 backdrop-blur-3xl rounded-full `}
        >
            <div
                className={` h-full relative flex justify-between items-center p-2`}
            >
                <input
                    onChange={handleInput}
                    type={"text"}
                    placeholder={"Search by city or country"}
                    className={`flex-1 bg-transparent outline-none text-white placeholder:text-white h-full pl-6 font-light`}
                />
                <button
                    onClick={handleSubmit}
                    className={`text-2xl w-20 rounded-full flex justify-center items-center bg-[#3FA2C1] h-12 text-white`}
                >
                    <IoMdSearch/>
                </button>
            </div>
        </form>
        <div
            className={` bg-black/30 w-full max-w-[450px] min-h-[500px] text-white px-6 py-12 backdrop-blur-3xl rounded-[30px]`}
        >
            {loading ? (<div className="w-full h-full flex flex-col gap-3 justify-center items-center text-4xl">
                <div className=" animate-spin ">
                    <ImSpinner2/>
                </div>
                <div className={` text-2xl`}>Loading</div>
            </div>) : (<div>
                <div className={` flex w-full rounded-2xl gap-x-5 items-center`}>
                    <div className={` text-[80px]`}>{icon}</div>
                    <div>
                        <div className={` text-2xl font-semibold`}>
                            {data.name}, {data.sys.country}
                        </div>
                        <div>
                            {date.getUTCDate() + 1}/{date.getUTCMonth() + 1}/
                            {date.getUTCFullYear()}
                        </div>
                    </div>
                </div>
                <div className={` my-20`}>
                    <div className={`flex justify-center items-center`}>
                        <div className={`text-[144px] font-light leading-none`}>
                            {parseInt(data.main.temp)}
                        </div>
                        <div className={`text-4xl`}>
                            <TbTemperatureCelsius/>
                        </div>
                    </div>
                    <div className={` text-center capitalize`}>
                        {data.weather[0].description}
                    </div>
                </div>
                <div className={` mx-auto max-w-[380px] flex flex-col gap-y-6`}>
                    <div className={`flex justify-between items-center`}>
                        <div className={`flex items-center gap-x-2`}>
                            <div className={` text-2xl`}>
                                <BsEye/>
                            </div>
                            <div>
                                Visibility :
                                <span className={` ml-1`}>{data.visibility / 1000} km</span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-x-1`}>
                            <div className={` text-2xl`}>
                                <BsThermometer/>
                            </div>
                            <div className={` flex items-center justify-center`}>
                                Feels like``
                                <span className={` ml-1`}>
                      {parseInt(data.main.feels_like)}
                    </span>
                                <div>
                                    <TbTemperatureCelsius/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`flex justify-between items-center`}>
                        <div className={`flex items-center gap-x-2`}>
                            <div className={` text-2xl`}>
                                <BsWater/>
                            </div>
                            <div>
                                Humidity :
                                <span className={` ml-1`}>{data.main.humidity}%</span>
                            </div>
                        </div>
                        <div className={`flex items-center gap-x-1`}>
                            <div className={` text-2xl`}>
                                <BsWind/>
                            </div>
                            <div className={` flex items-center justify-center`}>
                                Wind <span className={` ml-1`}>{data.wind.speed} m/s </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    </div>);
};

export default App;
