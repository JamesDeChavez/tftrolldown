import React, { useContext } from 'react'
import { GameContext } from '../../GameContext'
import { Game, Unit as UnitClass } from '../../game/classes'
import './styles.css'

interface Props {
    champData: UnitClass | undefined,
    index: number
}

const colorForEachCost = {
    1: 'grey',
    2: 'green',
    3: 'blue',
    4: 'darkmagenta',
    5: 'orange'
}

const Unit: React.FC<Props> = ({champData, index}) => {
    const { champShop, setChampShop, champBench, setChampBench, gold, setGold, gameActive } = useContext(GameContext)
    let backgroundColor: string = '#213847'
    let borderColor: string = '#917a49'
    let borderThickness: string = '1px'
    let unitImage
    let champNameForImage
    if (champData) { 
        champNameForImage = champData.name.replace(/ |'|&/g, '').toLowerCase().charAt(0).toUpperCase() + champData.name.replace(/ |'|&/g, '').toLowerCase().slice(1)
        unitImage = require(`../../assets/tft-champion/TFT8_${champNameForImage}.TFT_Set8.png`)
        borderThickness = '3px'
        switch(champData.cost) {
            case 1: 
                backgroundColor = colorForEachCost[1]; 
                borderColor = colorForEachCost[1];
                break;
            case 2: 
                backgroundColor = colorForEachCost[2]; 
                borderColor = colorForEachCost[2];
                break;
            case 3: 
                backgroundColor = colorForEachCost[3]; 
                borderColor = colorForEachCost[3];
                break;
            case 4: 
                backgroundColor = colorForEachCost[4]; 
                borderColor = colorForEachCost[4];
                break;
            case 5: 
                backgroundColor = colorForEachCost[5]; 
                borderColor = colorForEachCost[5];
                break;
            default: break;
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!champData || gold < champData.cost || !gameActive) return
        if (
            champBench.filter(champ => champ !== undefined).length === 9 && 
            champBench.filter(champ =>
                champ && 
                champ.name === champData.name &&
                champ.stars === 1
            ).length < 2
        ) return

        const { newBench, newShop } = Game.buyUnit(champShop, champBench, index)
        setChampBench(newBench)
        setChampShop(newShop)
        setGold(prevState => prevState - champData.cost)
    }

    const className = 'Unit'
    return (<>
        {!champData ?
            <div className={`${className}_empty`} style={{
                backgroundColor: backgroundColor,
                border: `solid ${borderThickness} ${borderColor}`
            }}></div>
        :
            <div className={className} onClick={handleClick} style={{
                backgroundColor: backgroundColor,
                border: `solid ${borderThickness} ${borderColor}`
            }}>
                <div className={`${className}_imageContainer`}>
                    <img className={`${className}_image`} src={unitImage} alt="unitImage" />
                    <div className={`${className}_traitsContainer`}>
                    {champData.traits.map((trait, i) => {
                        return <p key={i}>{trait}</p>
                    })}
                    </div>
                </div>
                <div className={`${className}_nameplateContainer`}>
                    <p>{champData.name}</p>
                    <p>{`${champData.cost} G`}</p>
                </div>
            </div>
        }
    </>)
}

export default Unit