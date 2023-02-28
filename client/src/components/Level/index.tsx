import { useContext } from 'react'
import { GameContext } from '../../GameContext'
import { levelsData } from '../../game/manualData'
import './styles.css'

const Level = () => {
    const { level, cumulativeLevel } = useContext(GameContext)
    const denominator = levelsData[`level-${level}`].points
    const numerator = cumulativeLevel - (levelsData[`level-${level}`].cumulative - denominator)

    const className = 'Level'
    return (
        <div className={className}>
            <p>{`Level ${level}`}</p>
            <p>{level === 9 ?
                'Max'
            :
                `${numerator}/${denominator}`
            }</p>
        </div>
    )
}

export default Level