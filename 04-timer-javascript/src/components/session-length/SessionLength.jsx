import React from "react";
import { useState } from "react";
import './_session_length.scss';

function SESSION_LENGTH() {
    const [session, setSession] = useState(25);
    return (
        <div className="length-control">
            <div id="session-label">Session Length</div>
            <div className="session-container">
                <button className="btn-level" id="session-decrement" value="-">
                    <i className="fa-solid fa-plus"></i>
                </button>
                <div className="btn-level" id="session-length">{session}</div>
                <button className="btn-level" id="session-increment" value="+">
                    <i className="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    )
}

export default SESSION_LENGTH;