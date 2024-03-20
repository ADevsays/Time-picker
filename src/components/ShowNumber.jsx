import { Col } from "react-bootstrap";

function ShowNumber({children, isFirst, onClick}) {
    return (
        <Col onClick={onClick} className={`${isFirst ? "time-first-color" : "bg-secondary-subtle"} cursor-pointer show-number p-0 m-0 pb-1 rounded-3 d-flex justify-content-center align-items-center`}>
            <span>{children}</span>
        </Col>
    );
}

export default ShowNumber;