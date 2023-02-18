import './styles.css'

const GameForm = () => {
    const className = 'GameForm'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>TFT Rolldown</h1>
            <div className={`${className}_levelcontainer`}>
                <span>Level:</span>
                <button>Left</button>
                <span>2</span>
                <button>Right</button>
            </div>

        </div>
    )
}

export default GameForm