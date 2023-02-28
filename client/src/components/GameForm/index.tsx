import React, { useContext } from 'react'
import { GameContext } from '../../GameContext'
import { Game, LevelRange } from '../../game/classes'
import './styles.css'

interface Props {
    startGame: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    gameActive: boolean
}

const GameForm: React.FC<Props> = ({startGame, gameActive}) => {
    const { level, setLevel, setCumulativeLevel, gold, setGold, time, setTime } = useContext(GameContext)
    
    const handleLevelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, direction: string) => {
        e.preventDefault()
        const levelOptions: LevelRange[] = [2, 3, 4, 5, 6, 7, 8, 9]
        let index = levelOptions.indexOf(level)
        if(direction === 'left' && level > 2) index--
        if(direction === 'right' && level < 9) index++
        const newLevel = levelOptions[index]
        const newCumulativeLevel = Game.startingCumulativeLevel(newLevel)
        setLevel(newLevel)
        setCumulativeLevel(newCumulativeLevel)
    }

    const handleGoldClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, direction: string) => {
        e.preventDefault()
        let newGold = gold
        if(direction === 'left' && gold > 5) newGold--
        if(direction === 'right' && gold < 120) newGold++
        setGold(newGold)
    }

    const handleTimeClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, direction: string) => {
        e.preventDefault()
        let newTime = time
        if(direction === 'left' && time > 5) newTime--
        if(direction === 'right' && time < 99) newTime++
        setTime(newTime)
    }

    const className = 'GameForm'
    return (
        <div className={className} style={{display: gameActive ? 'none' : 'grid'}}>
            <h1 className={`${className}_header`}>TFT Rolldown</h1>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`}>Level:</label>
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`} onClick={(e) => handleLevelClick(e, 'left')}>Left</button>
                    <span className={`${className}_number`}>{level}</span>
                    <button className={`${className}_button`} onClick={(e) => handleLevelClick(e, 'right')}>Right</button>
                </div>
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`}>Gold:</label>
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`} onClick={(e) => handleGoldClick(e, 'left')}>Left</button>
                    <span className={`${className}_number`}>{gold}</span>
                    <button className={`${className}_button`} onClick={(e) => handleGoldClick(e, 'right')}>Right</button>
                </div>
            </div>
            <div className={`${className}_inputContainer`}>
                <label className={`${className}_label`}>Time:</label>
                <div className={`${className}_buttonsContainer`}>
                    <button className={`${className}_button`} onClick={(e) => handleTimeClick(e, 'left')}>Left</button>
                    <span className={`${className}_number`}>{`${time} sec.`}</span>
                    <button className={`${className}_button`} onClick={(e) => handleTimeClick(e, 'right')}>Right</button>
                </div>
            </div>
            <div className={`${className}_formButtonsContainer`}>
                <button onClick={startGame}>Start</button>
            </div>

        </div>
    )
}

export default GameForm