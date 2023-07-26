import BREAK_LENGTH from "./components/break-length/BreakLength";
import SESSION_LENGTH from "./components/session-length/SessionLength";

function App() {
    return (
        <div className="container">
            <div id="app">
                <h1>25 + 5 Clock</h1>
                <div className="bloc-length">
                    <BREAK_LENGTH />
                    <SESSION_LENGTH />
                </div>
            </div>
        </div>
    );
}

export default App;
