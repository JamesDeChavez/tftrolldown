import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../game/GameContext'
import { Game } from '../../game/classes'
import './styles.css'

const Traits = () => {
    const { champBench, activeTraits, setActiveTraits } = useContext(GameContext)

    useEffect(() => {
        const newActiveTraits = Game.determineActiveTraits(champBench)
        setActiveTraits(newActiveTraits)
    }, [champBench])

    const className = 'Traits'
    return (
        <div className={className}>
            <h2 className={`${className}_header`}>Active Traits</h2>
            <div className={`${className}_traitsContainer`}>    
                {Object.keys(activeTraits).map(trait => {
                    return (
                        <p className={`${className}_trait`}>
                            <span>{trait}</span>
                            <span>{activeTraits[trait]}</span>
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default Traits