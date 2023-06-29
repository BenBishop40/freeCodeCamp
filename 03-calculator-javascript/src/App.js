import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
    let [operationDisplay, setOperationDisplay] = useState([]);
    let [display, setDisplay] = useState([0]);

    function computeResult(operationDisplay) {
        const expression = operationDisplay.join("");
        const result = eval(expression);
        return result;
    }

    const handlePressEqual = useCallback(
        (event) => {
            if (event.key === "=") {
                computeResult(display);
            }
        },
        [display]
    );

    useEffect(() => {
        // Ecouteur évènements keypress:
        document.addEventListener("keypress", handlePressEqual);
        return () => {
            document.removeEventListener("keypress", handlePressEqual);
        };
    }, [handlePressEqual]);

    function handleClick(event) {
        // if (operationDisplay.find((item) => item === "=")) {
        //     setDisplay([0]);
        //     setOperationDisplay([0]);
        // }

        if (event.target.value === "AC") {
            setDisplay([0]);
            setOperationDisplay([]);
        } else {
            const newDigit = event.target.value;
            const regExpNumbersOnly = /^[0-9]/;
            const regExpOperatorsOnly = /^[+-/*]$/;
            if (newDigit.match(regExpNumbersOnly)) {
                console.log(typeof newDigit);
                if (display[0] === 0 && display[1] !== "." && newDigit !== ".") {
                    const displayTxt = [Number(newDigit)];
                    setDisplay(displayTxt);
                    setOperationDisplay(displayTxt);
                } else if (display[0] === 0 && display[1] === ".") {
                    const displayTxt = [...display, Number(newDigit)];
                    setDisplay(displayTxt);
                    setOperationDisplay(displayTxt);
                } else if (operationDisplay.includes("=")) {
                    console.log(operationDisplay.includes("="));
                    setDisplay([newDigit]);
                    setOperationDisplay([newDigit]);
                } else if (newDigit) {
                    const displayTxt = [...display, Number(newDigit)];
                    setDisplay(displayTxt);
                    setOperationDisplay(displayTxt);
                }
                console.log(display);
            } else if (newDigit.match(regExpOperatorsOnly)) {
                console.log(typeof newDigit);
                if (newDigit) {
                    const displayTxt = [...display, newDigit];
                    setDisplay(displayTxt);
                    setOperationDisplay(displayTxt);
                }
            } else if (newDigit === "=") {
                const result = computeResult(display);
                const displayTxt = [...display, "=", result.toString()];
                setOperationDisplay(displayTxt);
                setDisplay([result]);
            }
        }
    }

    return (
        <div className="App">
            <h1>| Javascript calculator |</h1>
            <div className="calculator">
                <div className="input-screen">{operationDisplay}</div>
                <div className="output-screen" id="display">
                    {display}
                </div>
                <div id="calculator-pad">
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <button id="clear" value="AC" onClick={handleClick}>
                                        AC
                                    </button>
                                </td>
                                <td>
                                    <button id="divide" value="/" className="operator" onClick={handleClick}>
                                        /
                                    </button>
                                </td>
                                <td>
                                    <button id="multiply" value="*" className="operator" onClick={handleClick}>
                                        x
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button id="seven" value="7" className="number" onClick={handleClick}>
                                        7
                                    </button>
                                </td>
                                <td>
                                    <button id="eight" value="8" className="number" onClick={handleClick}>
                                        8
                                    </button>
                                </td>
                                <td>
                                    <button id="nine" value="9" className="number" onClick={handleClick}>
                                        9
                                    </button>
                                </td>
                                <td>
                                    <button id="subtract" value="-" className="operator" onClick={handleClick}>
                                        -
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button id="four" value="4" className="number" onClick={handleClick}>
                                        4
                                    </button>
                                </td>
                                <td>
                                    <button id="five" value="5" className="number" onClick={handleClick}>
                                        5
                                    </button>
                                </td>
                                <td>
                                    <button id="six" value="6" className="number" onClick={handleClick}>
                                        6
                                    </button>
                                </td>
                                <td>
                                    <button id="add" value="+" className="operator" onClick={handleClick}>
                                        +
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button id="one" value="1" className="number" onClick={handleClick}>
                                        1
                                    </button>
                                </td>
                                <td>
                                    <button id="two" value="2" className="number" onClick={handleClick}>
                                        2
                                    </button>
                                </td>
                                <td>
                                    <button id="three" value="3" className="number" onClick={handleClick}>
                                        3
                                    </button>
                                </td>
                                <td rowSpan="2">
                                    <button id="equals" value="=" onClick={handleClick}>
                                        =
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button id="zero" value="0" className="number" onClick={handleClick}>
                                        0
                                    </button>
                                </td>
                                <td>
                                    <button id="decimal" value="." className="operator" onClick={handleClick}>
                                        .
                                    </button>
                                </td>
                            </tr>
                            <tr className="footer">
                                <td colSpan="4">
                                    Coded by Ben Bishop
                                    <a href="https://github.com/BenBishop40" target="_blank" rel="noreferrer">
                                        <i className="fa-brands fa-github"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default App;
