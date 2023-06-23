import { soundBank } from "./soundBank";
import { soundBank2 } from "./soundBank2";
import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
    const [currentSound, setCurrentSound] = useState("");
    const [selectedKey, setSelectedKey] = useState("");
    const [isKeyPressed, setIsKeyPressed] = useState(false);
    const [powerIsDisabled, setPowerIsDisabled] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const [isVolumeChanged, setIsVolumeChanged] = useState(false);
    const [activeSoundBank, setActiveSoundBank] = useState(soundBank);
    const [showSoundBankName, setShowSoundBankName] = useState(false);

    // Fonction gestion état Power
    const toggleDisable = (buttonID) => {
        if (buttonID === "power-btn") {
            setPowerIsDisabled(!powerIsDisabled);
            setCurrentSound(null);
        } else if (buttonID === "bank-btn") {
            togglesoundBank();
        }
    };

    const togglesoundBank = () => {
        setActiveSoundBank(activeSoundBank === soundBank ? soundBank2 : soundBank);
        setCurrentSound(null);
        setShowSoundBankName(true);

        setTimeout(() => {
            setShowSoundBankName(false);
        }, 2000);
    };

    // Fonction gestion volumee son
    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        setIsVolumeChanged(true);
        setCurrentSound(null);

        setTimeout(() => {
            setIsVolumeChanged(false);
        }, 2000);
    };

    // fonction pad click et play sound
    const handlePadClick = (keyTrigger) => {
        if (!powerIsDisabled) return;

        const sound = activeSoundBank.find((item) => item.keyTrigger === keyTrigger);
        if (sound) {
            const audioElement = document.getElementById(sound.keyTrigger).getElementsByTagName("audio")[0];
            audioElement.currentTime = 0;
            audioElement.volume = volume;
            audioElement.play();
            setCurrentSound(sound.id);
            setSelectedKey(sound.keyTrigger);
            setIsKeyPressed(true);

            setTimeout(() => {
                setIsKeyPressed(false);
            }, 300);
        }
        console.log(keyTrigger);
    };

    // fonction keypress et play sound
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (!powerIsDisabled) return;
            const keyPressed = String.fromCharCode(event.keyCode).toUpperCase();
            const sound = soundBank.find((item) => item.keyTrigger === keyPressed);
            if (sound) {
                const audioElement = document.getElementById(sound.keyTrigger).getElementsByTagName("audio")[0];
                audioElement.currentTime = 0;
                audioElement.volume = volume;
                audioElement.play();
                setCurrentSound(sound.id);
                setSelectedKey(sound.keyTrigger);
                setIsKeyPressed(true);

                setTimeout(() => {
                    setIsKeyPressed(false);
                }, 300);
            }
            console.log(keyPressed);
        };
        // Ecouteur évènements keypress:
        document.addEventListener("keypress", handleKeyPress);
        return () => {
            document.removeEventListener("keypress", handleKeyPress);
        };
    }, [powerIsDisabled, volume, isVolumeChanged]);

    // fonction display pad et gestion évènements :
    const drumPads = activeSoundBank.map((sound) => {
        const classNames = `drum-pad ${selectedKey === sound.keyTrigger && isKeyPressed ? "selected" : ""}`;
        return (
            <div
                key={sound.id}
                className={classNames}
                id={sound.keyTrigger}
                onClick={() => handlePadClick(sound.keyTrigger)}
            >
                <audio src={sound.url} className="clip" id={sound.keyTrigger}></audio>
                {sound.keyTrigger}
            </div>
        );
    });

    // Rendu composant :
    return (
        <div className="app">
            <h1>| Drum Machine |</h1>
            <div id="drum-machine">
                <div id="pad-board">{drumPads}</div>
                <div id="drum-controllers">
                    <div id="display">
                        {powerIsDisabled && (
                            <>
                                {currentSound}
                                {!currentSound && isVolumeChanged && `Volume: ${Math.round(volume * 100)}`}
                                {!currentSound &&
                                    (showSoundBankName && activeSoundBank === soundBank ? "Heater-Kit" : "")}
                                {!currentSound &&
                                    (showSoundBankName && activeSoundBank === soundBank2 ? "Smooth Piano" : "")}
                            </>
                        )}
                    </div>
                    <div id="power">
                        Power button
                        <button
                            onClick={() => toggleDisable("power-btn")}
                            className={powerIsDisabled ? "toggle-button active" : "toggle-button"}
                        ></button>
                    </div>
                    <div id="volume-controller">
                        <label>Volume controller</label>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
                    </div>
                    <div id="bank-controller">
                        Bank controller
                        <button
                            onClick={() => toggleDisable("bank-btn")}
                            className={
                                activeSoundBank !== soundBank ? "bank-toggle-button active" : "bank-toggle-button"
                            }
                        ></button>
                    </div>
                </div>
            </div>
            <footer className="footer-container">
                <p>{`<| coded by Ben Bishop | 2023 >`}</p>
                <a href="https://github.com/BenBishop40" target="_blank" rel="noreferrer">
                    <i class="fa-brands fa-github"></i>
                </a>
            </footer>
        </div>
    );
}
export default App;
