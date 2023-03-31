import { Unit } from '../../game/classes'

interface Props {
    game: any
}

const GameSummary: React.FC<Props> = ({game}) => {
    let unitImage
    let champNameForImage
    let teamSize = game.finalTeam.filter((champ: Unit) => champ).length
    let traitSize = Object.keys(game.finalTraits).length

    const className = 'GameSummary'
    return (
        <div className={className}>
            <p>{`Level: ${game.startingLevel}  Gold: ${game.startingGold}  Time: ${game.startingTime}`}</p>
            <div className={`${className}_teamContainer`}>
                {teamSize ?
                    game.finalTeam.filter((champ: Unit) => champ).map((unit: Unit) => {
                        champNameForImage = unit.name.replace(/ |'|&/g, '').toLowerCase().charAt(0).toUpperCase() + unit.name.replace(/ |'|&/g, '').toLowerCase().slice(1)
                        try {
                            unitImage = require(`../../assets/tft-champion/TFT8_${champNameForImage}.TFT_Set8.png`)
                        } catch (error) {
                            unitImage = require(`../../assets/tft-champion/TFT8_${champNameForImage}.TFT_Set8_Stage2.png`)
                        }
                        return (
                            <div className={`${className}_imageContainer`}>
                                <img src={unitImage} alt="face" className={`${className}_image`} />
                                <div>{unit.name}</div>
                                <div>{`${unit.stars} *`}</div>
                            </div>
                        )
                    })
                :
                    <div>You had no units</div>
                }

            </div>
            <div className={`${className}_traitsContainer`}>
                {traitSize ?
                    Object.keys(game.finalTraits).map(trait => {
                        return (
                            <div>{`${trait} - ${game.finalTraits[trait]}`}</div>
                        )
                    })
                :
                    <div>You had no traits</div>
                }
            </div>
        </div>
    )
}

export default GameSummary