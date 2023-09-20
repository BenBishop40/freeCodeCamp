import { useEffect, useState } from "react";

const useCountDown = (targetDate, isTimerRunning) => {
    const countDownDate = targetDate * 60 * 1000;
    const [countDown, setCountDown] = useState(countDownDate);

    useEffect(() => {
        let interval;

        if (isTimerRunning) {
            interval = setInterval(() => {
                setCountDown((prevCountDown) => {
                    if (prevCountDown > 0) {
                        return prevCountDown - 1000;
                    } else {
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 1000);
        } else {
            setCountDown(countDownDate);
        }

        return () => clearInterval(interval);
    }, [targetDate, isTimerRunning, countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
    // Calculate time left :
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    return [minutes, seconds];
};

export { useCountDown };
