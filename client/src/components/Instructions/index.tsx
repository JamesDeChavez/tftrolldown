import './styles.css'

const Instructions = () => {
    const className = 'Instructions'
    return (
        <div className={className}>
            <h1 className={`${className}_header`}>Teamfight Tactics Roll-Down Training</h1>
            <ul className={`${className}_list`}>
                <li className={`${className}_listitem`}>Practice your one turn roll-down mechanics for the game <a href="https://teamfighttactics.leagueoflegends.com/en-us/" className={`${className}_link`} target='_blank'>Teamfight Tactics</a></li>
                <li className={`${className}_listitem`}>Select your starting Level, Gold, and Time from the Game Options section to the left and then click Start</li>
                <li className={`${className}_listitem`}>Build the strongest team you can using the normal TFT game mechanics:</li>
                <li className={`${className}_listitemIndented`}>1. Refresh Shop - shop button or 'd' key press</li>
                <li className={`${className}_listitemIndented`}>2. Buy XP - shop button or 'f' key press</li>
                <li className={`${className}_listitemIndented`}>3. Buy Units - click shop champion portrait</li>
                <li className={`${className}_listitemIndented`}>4. Sell Units - drag and drop unit from bench to shop or 'e' key press while hovering unit</li>
                <li className={`${className}_listitem`}>Switch to the 'Game History' tab after your games to review your past session roll-downs</li>
            </ul>
        </div>
    )
}

export default Instructions