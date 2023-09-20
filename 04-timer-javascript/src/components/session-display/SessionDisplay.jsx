import React, { useEffect, useState } from "react"
import "./_session_display.scss"
import CountDownTimer from "../timer/countDownTimer";

function SESSION_DISPLAY () {

    const [timeLeft, setTimeLeft] = useState(25);
    const [isTimerRunning, setIsTimerRunning] = useState(false);


    const handleStartStopClick = () => {
        setIsTimerRunning(!isTimerRunning);
    }

    const handleResetClick = () => {
        setIsTimerRunning(false);
        setTimeLeft(25);
    }

    useEffect(() => {}, [timeLeft]);

    return (
        <div className="display-block">
            <div id="timer-label">
                <p>Session</p>
                <div id = "time-left">
                    <CountDownTimer targetDate={timeLeft} isTimerRunning={isTimerRunning}/>
                    <div className="control-panel">
                        <button id="start_stop" onClick={handleStartStopClick}>
                            <i className="fa-solid fa-play"></i>
                            <i className="fa-solid fa-pause"></i>
                        </button>
                        <button id ="reset" onClick={handleResetClick}>
                            <i className="fa-solid fa-arrows-rotate"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SESSION_DISPLAY