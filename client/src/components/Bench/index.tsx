import { useContext } from 'react'
import { GameContext } from '../../game/GameContext'
import BenchUnit from '../BenchUnit'
import './styles.css'

const Bench = () => {
    const { champBench, setSellActive } = useContext(GameContext)
    
    const className = 'Bench'

    return (
        <div className={className}>
            {champBench.map((champ, i) => {
                return <BenchUnit champData={champ} key={i} index={i} setSellActive={setSellActive}/>
            })}
        </div>
    )
}

export default Bench