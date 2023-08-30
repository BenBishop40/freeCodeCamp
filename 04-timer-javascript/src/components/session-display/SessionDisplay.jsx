import React, { useState } from "react"
import "./_session_display.scss"
import CountDownTimer from "../timer/countDownTimer";

function SESSION_DISPLAY () {

    const [timeLeft, setTimeLeft] = useState(1);

    return (
        <div className="display-block">
            <div id="timer-label">
                <p>Session</p>
                <div id = "time-left">
                    <CountDownTimer targetDate={timeLeft} />
                </div>
            </div>
        </div>
    )
}
export default SESSION_DISPLAY