import { useState } from "react";
import { Col } from "react-bootstrap";

function PeriodIndicator({className, setCurrentTime}) {
    const [period, setPeriod] = useState("AM");

    const handlePeriod = (period)=>{
        setCurrentTime(currentTime => ({...currentTime, period}));
        setPeriod(period);
    }

    return (
        <Col className={`${className} period-indicator d-flex align-items-center flex-column p-0 fw-semibold ms-2`}>
            <div onClick={()=> handlePeriod("AM")} className={`${period === "AM" ? "time-first-color" : ""} cursor-pointer h-50 d-flex align-items-center border border-2 border-bottom-0 rounded-top-3 px-2 justify-content-center`}>AM</div>
            <div onClick={()=> handlePeriod("PM")} className={`${period === "PM" ? "time-first-color": ""} h-50 d-flex align-items-center cursor-pointer border border-2 px-2 rounded-bottom-3 justify-content-center`}>PM</div>
        </Col>
    );
}

export default PeriodIndicator;