import "./App.css";
import { sampleText } from "./sampleText";
import { useState } from "react";
import { marked } from "marked";

marked.use({
    gfm: true,
    breaks: true,
});

function App() {
    const [text, setText] = useState(sampleText);

    function handleChange(event) {
        const text = event.target.value;
        setText(text);
    }

    function renderText(text) {
        const __html = marked(text);
        return { __html };
    }

    return (
        <div className="App">
            <div className="container">
                <div className="row d-flex justify-content-evenly">
                    <div className="col-md-12 col-lg-6">
                        <textarea rows="40" cols="60" value={text} onChange={handleChange} id="editor"></textarea>
                    </div>
                    <div className="col-md-12 col-lg-6">
                        <div id="preview" dangerouslySetInnerHTML={renderText(text)}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
