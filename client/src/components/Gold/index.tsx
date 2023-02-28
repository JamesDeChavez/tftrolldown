import { useContext } from 'react'
import { GameContext } from '../../GameContext'
import './styles.css'

const Gold = () => {
    const { gold } = useContext(GameContext)

    const className = 'Gold'

    return (
        <div className={className}>
            <p>{`${gold} G`}</p>
        </div>
    )
}

export default Gold