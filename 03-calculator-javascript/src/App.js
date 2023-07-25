import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { evaluate } from "mathjs";

function App() {
    let [display, setDisplay] = useState([]);
    let [currentValue, setCurrentValue] = useState([]);

    function computeResult(display) {
        const expression = display.join("");
        const result = evaluate(expression);
        return result;
    }

    const handlePressEqual = useCallback(
        (event) => {
            if (event.key === "=") {
                computeResult(currentValue);
            }
        },
        [currentValue]
    );

    useEffect(() => {
        // Ecouteur évènements keypress:
        document.addEventListener("keypress", handlePressEqual);
        return () => {
            document.removeEventListener("keypress", handlePressEqual);
        };
    }, [handlePressEqual]);

    function handleClick(event) {
        const newDigit = event.target.value;
        const regExpNumbersOnly = /^[0-9]$/;
        const regExpOperatorsOnly = /^[+-/*]$/;

        // Condition "AC" -> Clear
        if (newDigit === "AC") {
            setCurrentValue([0]);
            setDisplay([]);

            // Condition "=" -> Compute result display
        } else if (newDigit === "=") {
            const result = computeResult(display);
            const displayTxt = [...display, "=", result.toString()];
            setDisplay(displayTxt);
            setCurrentValue([result]);

            // Condition si ajout number / operator
        } else if (newDigit === ".") {
            // User Story #11: Append "." to the currently displayed value
            if (!currentValue.includes(".") && currentValue[0] !== "=") {
                const displayTxt = [...display, newDigit];
                const currentDisplay = [...currentValue, newDigit];
                setCurrentValue(currentDisplay);
                setDisplay(displayTxt);
            }
        } else {
            // Condition Num Only
            if (newDigit.match(regExpNumbersOnly)) {
                // Suppression 0 si premier caractere
                if (currentValue[0] === 0 && display[1] !== "." && newDigit !== ".") {
                    const displayTxt = [Number(newDigit)];
                    setCurrentValue(displayTxt);
                    setDisplay(displayTxt);
                } else if (display.includes("=")) {
                    setCurrentValue([newDigit]);
                    setDisplay([newDigit]);
                } else if (newDigit) {
                    const displayTxt = [...display, Number(newDigit)];
                    const currentValue = (prevValue) => [...prevValue, newDigit];
                    setCurrentValue(currentValue);
                    setDisplay(displayTxt);
                }
                // Condition Operator Only
            } else if (newDigit.match(regExpOperatorsOnly)) {
                // Condition multiple operateurs si pas de "=" dans display
                if (display.length > 0 && !display.includes("=")) {
                    // Check if the new operator comes right after another one
                    if (
                        regExpOperatorsOnly.test(display[display.length - 1]) &&
                        newDigit !== "-" &&
                        display[display.length - 1] !== "-"
                    ) {
                        // Remove of the previous operator
                        const displayTxt = [...display.slice(0, -1), newDigit];
                        const currentValueTxt = [...currentValue.slice(0, -1), newDigit];
                        setDisplay(displayTxt);
                        setCurrentValue(currentValueTxt);
                    } else if (
                        // User story 13 : condition > 2 opérators -> supprime les opérateurs
                        regExpOperatorsOnly.test(display[display.length - 1]) &&
                        regExpOperatorsOnly.test(display[display.length - 2])
                    ) {
                        // Remove of the previous operator
                        const displayTxt = [...display.slice(0, -2), newDigit];
                        const currentValueTxt = [...currentValue.slice(0, -2), newDigit];
                        setDisplay(displayTxt);
                        setCurrentValue(currentValueTxt);
                    } else {
                        const displayTxt = [...display, newDigit];
                        setCurrentValue(newDigit);
                        setDisplay(displayTxt);
                    }

                    // Si "=" -> renvoi du result dans display pour relance calcul direct avec operator
                } else {
                    const displayTxt = [currentValue[0], newDigit];
                    setCurrentValue(newDigit);
                    setDisplay(displayTxt);
                }
            }
        }
    }

    return (
        <div className="App">
            <h1>| Javascript calculator |</h1>
            <div className="calculator">
                <div className="input-screen">{display}</div>
                <div className="output-screen" id="display">
                    {currentValue}
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
