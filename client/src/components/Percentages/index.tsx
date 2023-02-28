import { useState, useContext, useEffect } from 'react'
import { GameContext } from '../../GameContext'
import { Game } from '../../game/classes'
import './styles.css'

const Percentages = () => {
    const { level } = useContext(GameContext)
    const [oneCostPercentage, setOneCostPercentage] = useState(0)
    const [twoCostPercentage, setTwoCostPercentage] = useState(0)
    const [threeCostPercentage, setThreeCostPercentage] = useState(0)
    const [fourCostPercentage, setFourCostPercentage] = useState(0)
    const [fiveCostPercentage, setFiveCostPercentage] = useState(0)
    
    useEffect(() => {
        const rollPercentages = Game.getRollPercentages(level)
        setOneCostPercentage(Math.round(rollPercentages['one-cost'] * 100))
        setTwoCostPercentage(Math.round(rollPercentages['two-cost'] * 100))
        setThreeCostPercentage(Math.round(rollPercentages['three-cost'] * 100))
        setFourCostPercentage(Math.round(rollPercentages['four-cost'] * 100))
        setFiveCostPercentage(Math.round(rollPercentages['five-cost'] * 100))
    }, [level])

    const className = 'Percentages'
    return (
        <div className={className}>
            <p>{`${oneCostPercentage} %`}</p>
            <p>{`${twoCostPercentage} %`}</p>
            <p>{`${threeCostPercentage} %`}</p>
            <p>{`${fourCostPercentage} %`}</p>
            <p>{`${fiveCostPercentage} %`}</p>
        </div>
    )
}

export default Percentages