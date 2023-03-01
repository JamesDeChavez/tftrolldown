import { useContext } from 'react'
import { GameContext } from '../../GameContext'
import GameSummary from './GameSummary'
import './styles.css'

const GameHistory = () => {
    const { gameHistory } = useContext(GameContext)

    const className = 'GameHistory'
    return (
        <div className={className}>
            <div className={`${className}_tableHeaders`}>
                <p>Game Options</p>
                <p>Final Team</p>
                <p>Final Traits</p>
            </div>
            {gameHistory ?
                gameHistory.slice(0, 4).map(game => {
                    return <GameSummary game={game}/> 
                })
            :
                <div style={{textAlign: 'center', marginTop: '1rem'}}>Your session's game history will appear here</div>
            }
        </div>
    )
}

export default GameHistory