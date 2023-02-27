import React from 'react'
import './styles.css'

interface Props {
    startGame: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const GameForm: React.FC<Props> = ({startGame}) => {
    const className = 'GameForm'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>TFT Rolldown</h1>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`}>Level:</label>
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`}>Left</button>
                    <span className={`${className}_number`}>7</span>
                    <button className={`${className}_button`}>Right</button>
                </div>
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`}>Gold:</label>
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`}>Left</button>
                    <span className={`${className}_number`}>50</span>
                    <button className={`${className}_button`}>Right</button>
                </div>
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`}>Time:</label>
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`}>Left</button>
                    <span className={`${className}_number`}>50 sec.</span>
                    <button className={`${className}_button`}>Right</button>
                </div>
            </div>
            <div className={`${className}_formButtonsContainer`}>
                <button onClick={startGame}>Start</button>
                <button>Close</button>
            </div>

        </div>
    )
}

export default GameForm