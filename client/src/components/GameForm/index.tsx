import React, { useContext, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { GameContext } from '../../game/GameContext'
import { Game, LevelRange } from '../../game/classes'
import Instructions from '../Instructions'
import GameHistory from '../GameHistory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight, faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import './styles.css'

interface Props {
    startGame: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    gameActive: boolean
}

const GameForm: React.FC<Props> = ({startGame, gameActive}) => {
    const { level, setLevel, setCumulativeLevel, gold, setGold, time, setTime } = useContext(GameContext)
    const [instructionsVisible, setInstructionsVisible] = useState(true)
    const goldRef = useRef<any>()
    const timeRef = useRef<any>()
    const intervalId = useRef<any>()
    
    const handleLevelClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, direction: string) => {
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

    const handleGoldMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, direction: string) => {
        e.preventDefault()
        let newGold = gold
        if(direction === 'left' && gold > 0) newGold--
        if(direction === 'right' && gold < 500) newGold++
        setGold(newGold)

        intervalId.current = setInterval(() => {
            if(direction === 'left' && goldRef.current > 0) setGold(goldRef.current - 1)
            if(direction === 'right' && goldRef.current < 500) setGold(goldRef.current + 1)
            return () => clearInterval(intervalId.current)
        }, 100)
    }

    const handleGoldMouseUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault()
        clearInterval(intervalId.current)
    }

    const handleTimeMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, direction: string) => {
        e.preventDefault()
        let newTime = time
        if(direction === 'left' && time > 1) newTime--
        if(direction === 'right' && time < 120) newTime++
        setTime(newTime)

        intervalId.current = setInterval(() => {
            if(direction === 'left' && timeRef.current > 1) setTime(timeRef.current - 1)
            if(direction === 'right' && timeRef.current < 120) setTime(timeRef.current + 1)
            return () => clearInterval(intervalId.current)
        }, 100)
    }

    const handleTimeMouseUp = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.preventDefault()
        clearInterval(intervalId.current)
    }

    const handleInstructionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setInstructionsVisible(true)
    }

    const handleHistoryClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setInstructionsVisible(false)
    }

    useEffect(() => {
        goldRef.current = gold
    }, [gold])

    useEffect(() => {
        timeRef.current = time
    }, [time])

    const className = 'GameForm'
    return (
        <div className={className} style={{display: gameActive ? 'none' : 'grid'}}>
            <div className={`${className}_leftSection`}>
                <h2 className={`${className}_optionsHeader`}>Game Options</h2>
                <div className={`${className}_inputsContainer`}>
                    <div className={`${className}_inputContainer`}>
                        <label className={`${className}_label`}>Level:</label>
                        <div className={`${className}_buttonsContainer`}>
                            <FontAwesomeIcon icon={faCircleLeft} className={`${className}_button`} onClick={(e) => handleLevelClick(e, 'left')}/>
                            <span className={`${className}_number`}>{level}</span>
                            <FontAwesomeIcon icon={faCircleRight} className={`${className}_button`} onClick={(e) => handleLevelClick(e, 'right')}/>
                        </div>
                    </div>
                    <div className={`${className}_inputContainer`}>
                        <label className={`${className}_label`}>Gold:</label>
                        <div className={`${className}_buttonsContainer`}>
                            <FontAwesomeIcon icon={faCircleLeft} className={`${className}_button`} onMouseDown={(e) => handleGoldMouseDown(e, 'left')} onMouseUp={handleGoldMouseUp} />
                            <span className={`${className}_number`}>{gold}</span>
                            <FontAwesomeIcon icon={faCircleRight} className={`${className}_button`} onMouseDown={(e) => handleGoldMouseDown(e, 'right')} onMouseUp={handleGoldMouseUp} />
                        </div>
                    </div>
                    <div className={`${className}_inputContainer`}>
                        <label className={`${className}_label`}>Time:</label>
                        <div className={`${className}_buttonsContainer`}>
                            <FontAwesomeIcon icon={faCircleLeft} className={`${className}_button`} onMouseDown={(e) => handleTimeMouseDown(e, 'left')} onMouseUp={handleTimeMouseUp} /> 
                            <span className={`${className}_number`}>{`${time} sec.`}</span>
                            <FontAwesomeIcon icon={faCircleRight} className={`${className}_button`} onMouseDown={(e) => handleTimeMouseDown(e, 'right')} onMouseUp={handleTimeMouseUp} />
                        </div>
                    </div>
                </div>
                
                <div className={`${className}_formButtonsContainer`}>
                    <button className={`${className}_formButton`} onClick={startGame}>Start</button>
                </div>

            </div>
            <div className={`${className}_rightSection`}>
                <div className={`${className}_overlay`}>
                </div>
                <div className={`${className}_navContainer`}>
                    <button 
                        className={classNames(
                            `${className}_navButton`,
                            { [`${className}_activeNav`]: instructionsVisible }
                        )}
                        onClick={handleInstructionClick}
                    >Instructions</button>
                    <button 
                        className={classNames(
                            `${className}_navButton`,
                            { [`${className}_activeNav`]: !instructionsVisible }
                        )}
                        onClick={handleHistoryClick}
                    >Game History</button>
                </div>
                {instructionsVisible ?
                    <Instructions/>
                :
                    <GameHistory/>
                }
            </div>

            

        </div>
    )
}

export default GameForm