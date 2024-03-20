import { useEffect, useRef, useState } from "react";
import Times from "../consts/typeTime";

const baseDeg = 90;

const getCurrentTime = (angle, type) => {
    if (type === Times.HOURS) {
        let currentHour = (((angle / 30) + 12) % 12) + 3;
        if(currentHour > 12) currentHour -= 12;
        return currentHour;
    }
    return (((angle / 6) + 75) % 60);
}

function TimeHand({clockFather, currentTime, setCurrentTime, currentTypeTime}) {
    const [isRotate, setIsRotate] = useState(false);
    const [rotationStyle, setRotationStyle] = useState("");
    const [valueToCalc, setValueToCalc] = useState(30);
    const hourHandCurrent = useRef(null);

    const initRotate = () => {
        setIsRotate(true);
        document.body.classList.add("cursor-pointer");
    };

    const finishRotate = () => {
        setIsRotate(false);
        document.body.classList.remove("cursor-pointer");
    };

    const moveRotate = (event) => {
        if(!isRotate) return;
        const rect = clockFather.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        const angle = Math.atan2(y, x) * 180 / Math.PI;
        const calcAngle = Math.round(angle / valueToCalc) * valueToCalc;
        const currentCalcTime = getCurrentTime(calcAngle, currentTypeTime);
        setCurrentTime(prevTime => ({...prevTime, [currentTypeTime]: currentCalcTime, changeUser: false}));
        setRotationStyle(`rotate(${calcAngle - baseDeg}deg)`);
    };

    const rotateToTime = (time, type) => {
        const rotationAngle = time * (type === Times.HOURS ? 30 : 6);
        const adjustedRotationAngle = (rotationAngle + 270) % 360;
        const currentTime = getCurrentTime(adjustedRotationAngle, type);
        setCurrentTime(prevTime => ({...prevTime, [type]: currentTime, changeUser: false}));
        setRotationStyle(`rotate(${adjustedRotationAngle - baseDeg}deg)`);
    };

    useEffect(() => {
        document.addEventListener("mousemove", moveRotate);
        document.addEventListener("mouseup", finishRotate);

        return () => {
            document.removeEventListener("mousemove", moveRotate);
            document.removeEventListener("mouseup", finishRotate);
        }
    }, [isRotate]);

    useEffect(() => {
        setValueToCalc(currentTypeTime === Times.HOURS ? 30 : 6);
        rotateToTime(currentTime[currentTypeTime], currentTypeTime);
    }, [currentTypeTime]);

    useEffect(() => {
        if(!currentTime.changeUser) return;
        rotateToTime(currentTime[currentTypeTime], currentTypeTime);
    }, [currentTime]);

    return (
        <div 
            ref={hourHandCurrent}
            style={{transform: rotationStyle}} 
            onMouseDown={initRotate} 
            className="hour-hand">
        </div>
    );
}

export default TimeHand;
