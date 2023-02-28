import { act } from '@testing-library/react'
import { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../GameContext'
import { Game } from '../../game/classes'
import './styles.css'

const Traits = () => {
    const { champBench } = useContext(GameContext)
    const [activeTraits, setActiveTraits] = useState<any>({})

    useEffect(() => {
        const newActiveTraits = Game.determineActiveTraits(champBench)
        setActiveTraits(newActiveTraits)
    }, [champBench])

    const className = 'Traits'
    return (
        <div className={className}>
            {Object.keys(activeTraits).map(trait => {
                return (
                    <p>
                        <span>{trait}</span>
                        <span>{activeTraits[trait]}</span>
                    </p>
                )
            })}
        </div>
    )
}

export default Traits