import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
    let [display, setDisplay] = useState([]);

    function computeResult(display) {
        const expression = display.join("");
        const result = eval(expression);
        setDisplay([result]);
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
        if (event.target.value === "AC") {
            setDisplay("");
        } else {
            const newDigit = event.target.value;
            const regExpNumbersOnly = /^[0-9]/;
            const regExpOperatorsOnly = /^[+\-/*]$/;
            if (newDigit.match(regExpNumbersOnly)) {
                console.log(typeof newDigit);
                if (newDigit) {
                    let displayTxt = [...display, Number(newDigit)];
                    setDisplay(displayTxt);
                }
                console.log(display);
            } else if (newDigit.match(regExpOperatorsOnly)) {
                console.log(typeof newDigit);
                if (newDigit) {
                    let displayTxt = [...display, newDigit];
                    setDisplay(displayTxt);
                }
            } else if (newDigit === "=") {
                computeResult(display);
            }
        }
    }

    return (
        <div className="App">
            <h1>| Javascript calculator |</h1>
            <div className="calculator">
                <div className="input-screen">{display}</div>
                <div className="output-screen" id="display">
                    {(display = "" ? "0" : display)}
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
