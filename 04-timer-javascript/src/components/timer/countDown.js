import { useEffect, useState } from "react";

const useCountDown = (targetDate) => {
    const countDownDate = targetDate * 60 * 1000;

    const [countDown, setCountDown] = useState(countDownDate);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown((prevCountDown) => Math.max(prevCountDown - 1000), 0);
        }, 1000);
        return () => clearInterval(interval);
    }, [countDownDate]);

    return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
    // Calculate time left :
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    return [minutes, seconds];
};

export { useCountDown };
