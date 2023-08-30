const DateTimeDisplay = ({ value, isDanger }) => {
    return (
        <div className={isDanger ? "countdown danger" : "countdown"}>
            <p>{value < 10 ? "0" + value : value}</p>
        </div>
    );
};

export default DateTimeDisplay;
