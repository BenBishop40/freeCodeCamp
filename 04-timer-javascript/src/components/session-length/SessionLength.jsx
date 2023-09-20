import React from "react";
import { useState } from "react";
import './_session_length.scss';

function SESSION_LENGTH() {
    const [sessionLength, setSessionLength] = useState(25);

    const incrementSessionLength = () => {
        if (sessionLength <= 59) {
            setSessionLength(sessionLength+1);
        }
    }

    const decrementSessionLength = () => {
        if (sessionLength > 1) {
            setSessionLength(sessionLength-1);
        } 
    }

    return (
        <div className="display-block">
            <div id="session-label">Session Length</div>
            <div className="session-container">
                <button className="btn-level" id="session-decrement" value="-" onClick={decrementSessionLength}>
                    <i className="fa-solid fa-minus"></i>
                </button>
                <div className="btn-level" id="session-length">{sessionLength}</div>
                <button className="btn-level" id="session-increment" value="+" onClick={incrementSessionLength}>
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    )
}

export default SESSION_LENGTH;