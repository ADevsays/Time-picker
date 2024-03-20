import { useEffect, useRef, useState } from "react";
import TimeHand from "./TimeHand";
import Times from "../consts/typeTime";

const hoursArr = Array.from({length:12}, (_, i)=> i + 1);
const minutesArr = Array.from({length:12}, (_, i)=> i * 5);

function Clock({ currentTypeTime, currentTime, setCurrentTime}) {
    const [selfClock, setSelfClock] = useState();
    const [timeData, setTimeData] = useState({totalNum:12, numbers:hoursArr});
    const targetClock = useRef(null);

    const numberClasses = (number)=> {
        return `${number === currentTime[currentTypeTime] 
                        ? "text-black fw-medium" 
                        : "text-secondary"} clock-number p-2 cursor-pointer`
    };

    const calcAngle=(currentNum, totalNum = 12)=>{
        const adjustedNum = (currentNum * totalNum / 12) - 3;
        const angle = adjustedNum * (Math.PI / 6);
        return {
            x: 120 * Math.cos(angle),
            y: 120 * Math.sin(angle)
        }
    };

    const handleTimeUser=(number)=>{
        const copyTimeUser = {...currentTime};
        copyTimeUser[currentTypeTime] = number;
        copyTimeUser["changeUser"] = true;
        setCurrentTime(copyTimeUser);      
    };

    const getNumberStyles =(number)=>{
        return {
            left: `calc(50% + ${calcAngle(number, timeData.totalNum).x}px)`,
            top: `calc(50% + ${calcAngle(number, timeData.totalNum).y}px)`
        }
    };

    useEffect(() => {
        setTimeData({
            totalNum: currentTypeTime === Times.HOURS ? 12 : 60,
            numbers: currentTypeTime === Times.HOURS ? hoursArr : minutesArr
        });
    }, [currentTypeTime]);

    useEffect(()=>{
        setSelfClock(targetClock.current)
    }, [])

    return (
        <div ref={targetClock} className="clock position-relative">
            {timeData.numbers.map((number)=> (
                <span 
                    onClick={()=> handleTimeUser(number)}
                    key={number}
                    style={getNumberStyles(number)}
                    className={numberClasses(number)}>{number}</span>
            ))}
            <TimeHand 
                clockFather={selfClock} 
                setCurrentTime={setCurrentTime}
                currentTime={currentTime}
                currentTypeTime={currentTypeTime}
                />
        </div>
    );
}

export default Clock;