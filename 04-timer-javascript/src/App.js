import BREAK_LENGTH from "./components/break-length/BreakLength";
import SESSION_LENGTH from "./components/session-length/SessionLength";
import SESSION_DISPLAY from "./components/session-display/SessionDisplay";

function App() {
    return (
        <div className="container">
            <div id="app">
                <h1>25 + 5 Clock</h1>
                <div className="bloc-length">
                    <BREAK_LENGTH />
                    <SESSION_LENGTH />
                </div>
                <div>
                    <SESSION_DISPLAY />
                </div>
            </div>
        </div>
    );
}

export default App;
