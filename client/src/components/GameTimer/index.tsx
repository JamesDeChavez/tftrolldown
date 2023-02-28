import './styles.css'

interface Props {
    time: number,
    gameActive: boolean
}

const GameTimer: React.FC<Props> = ({time, gameActive}) => {
    const className = 'GameTimer'
    return (
        <div className={className} style={{display: gameActive ? 'flex' : 'none'}}>
            <p className={`${className}_text`}>[  ]</p>
            <p className={`${className}_text`}>{time}</p>
        </div>
    )
}

export default GameTimer