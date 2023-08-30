import { useCountDown } from "./countDown";
import DateTimeDisplay from "./DateTimeDisplay";

const ExiredNotice = () => {
    return (
        <div className="show-counter">
            <span>Expired !!!</span>
        </div>
    );
};

const ShowCounter = ({ minutes, seconds }) => {
    return (
        <div className="show-counter">
            <DateTimeDisplay value={minutes} isDanger={minutes === 0 && seconds <= 5} />
            <p>:</p>
            <DateTimeDisplay value={seconds} isDanger={minutes === 0 && seconds <= 5} />
        </div>
    );
};

const CountDownTimer = ({ targetDate }) => {
    const [minutes, seconds] = useCountDown(targetDate);

    if (minutes + seconds < 0) {
        return <ExiredNotice />;
    } else {
        return <ShowCounter minutes={minutes} seconds={seconds} />;
    }
};

export default CountDownTimer;
