import React from "react";
import './_break_length.scss';
import { useState } from "react";

function BREAK_LENGTH() {

    const [breakLength, setBreakLength] = useState(5);

    return (
        <div className="display-block">
            <div id="break-label">Break Length</div>
            <div className="break-container">
                <button className="btn-level" id="break-decrement" value="-">
                    <i className="fa-solid fa-plus"></i>
                </button>
                <div className="btn-level" id="break-length">{breakLength}</div>
                <button className="btn-level" id="break-increment" value="+">
                    <i className="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    )
}

export default BREAK_LENGTH;