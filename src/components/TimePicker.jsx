import { Row, Container, Col } from 'react-bootstrap';
import ShowNumber from './ShowNumber';
import PeriodIndicator from './PeriodIndicator';
import Clock from './Clock';
import { useState } from 'react';
import Times from "../consts/typeTime";
import '../Clock.css';

function TimePicker() {
    const baseData = { 
        hours: 12, 
        minutes: 0, 
        changeUser: false,
        period:"AM"
    };
    const [currentTime, setCurrentTime] = useState(baseData);
    const [typeTime, setTypeTime] = useState(Times.HOURS);

    const fixedTime = (time) => String(time).padStart(2, "0");
    const getTimeInLocaleString=()=>{
        const date = new Date();
        const {period, hours, minutes} = currentTime;
        if(hours === 12){
            date.setHours(period === "PM" ? 12 : 0);
        }else{
            date.setHours(period === "PM" ? hours + 12 : hours);
        }
        date.setMinutes(minutes);
        return date.toLocaleTimeString();
    };
    //La función getTimeInLocaleString devuelve la fecha escogida por el usuario, 
    //el button "listo" llama a esta funcion, cambia esta parte con lo que necesites para poder
    //manejar la fecha. Ya sea para guardarla en una base de datos o algo similar.
    
    return (
        <Container className="bg-white shadow p-4 text-black fw-medium container-time-picker">
            <p className="text-sm fw-medium opacity-75 text-secondary ">Selecciona la hora</p>
            <Row className="m-0 mt-4 gap-2">
                <ShowNumber onClick={() => setTypeTime(Times.HOURS)} isFirst={true}>{fixedTime(currentTime.hours)}</ShowNumber>
                <Col className="double-point flex-grow-0 boder border-black d-flex justify-content-center align-items-center p-0 m-2">
                    <span className='m-0 p-0 pb-4 d-flex justify-content-center align-items-center'>:</span>
                </Col>
                <ShowNumber onClick={() => setTypeTime(Times.MINUTES)}>{fixedTime(currentTime.minutes)}</ShowNumber>
                <PeriodIndicator setCurrentTime={setCurrentTime}/>
            </Row>
            <Clock setCurrentTime={setCurrentTime} currentTime={currentTime} currentTypeTime={typeTime} />
            <Row className="mt-5">
                <Col className='d-flex justify-content-end gap-4'>
                    <button className='border-0 fw-semibold fs-5 bg-transparent'>Cancelar</button>
                    <button
                        onClick={()=> getTimeInLocaleString()} 
                        className='border-0 fw-semibold fs-5 bg-transparent'>Listo</button>
                </Col>
            </Row>
        </Container>
    );
}

export default TimePicker;