import { useContext } from 'react'
import { GameContext } from '../../App'
import BenchUnit from './benchUnit'
import './styles.css'

const Bench = () => {
    const { champBench, setChampBench } = useContext(GameContext)
    
    const className = 'Bench'

    return (
        <div className={className}>
            {champBench.map((champ, i) => {
                return <BenchUnit champData={champ} key={i} index={i}/>
            })}
        </div>
    )
}

export default Bench