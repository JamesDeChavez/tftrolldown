import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import './styles.css'

interface Props {
    time: number,
    gameActive: boolean
}

const GameTimer: React.FC<Props> = ({time, gameActive}) => {
    const className = 'GameTimer'
    return (
        <div className={className} style={{display: gameActive ? 'flex' : 'none'}}>
            <FontAwesomeIcon icon={faClock} className={`${className}_clock`} />
            <p className={`${className}_text`}>{time}</p>
        </div>
    )
}

export default GameTimer