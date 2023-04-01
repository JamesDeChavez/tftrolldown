import React, { useContext, useEffect, useState } from 'react'
import { GameContext } from '../../game/GameContext'
import { Game, Unit as UnitClass } from '../../game/classes'
import defaultImage from '../../assets/tft-champion/TFT8_Alistar.TFT_Set8.png'
import './styles.css'

interface Props {
    champData: UnitClass | undefined,
    index: number, 
    setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>,
    allImagesLoaded: boolean
}

const colorForEachCost = {
    1: 'grey',
    2: 'green',
    3: 'blue',
    4: 'darkmagenta',
    5: 'orange'
}

const Unit: React.FC<Props> = ({champData, index, setImageLoaded, allImagesLoaded}) => {
    const { champShop, setChampShop, champBench, setChampBench, gold, setGold, gameActive } = useContext(GameContext)

    const [backgroundColor, setBackgroundColor] = useState('#2a5862')
    const [borderColor, setBorderColor] = useState('#181c26')
    const [unitImage, setUnitImage] = useState()

    useEffect(() => {
        if (champData) {
            const champNameForImage = champData.name.replace(/ |'|&/g, '').toLowerCase().charAt(0).toUpperCase() + champData.name.replace(/ |'|&/g, '').toLowerCase().slice(1)
            setUnitImage(require(`../../assets/tft-champion/TFT8_${champNameForImage}.TFT_Set8.png`))
            switch(champData.cost) {
                case 1: 
                    setBackgroundColor(colorForEachCost[1]) 
                    setBorderColor(colorForEachCost[1])
                    break
                case 2: 
                    setBackgroundColor(colorForEachCost[2]) 
                    setBorderColor(colorForEachCost[2])
                    break
                case 3: 
                    setBackgroundColor(colorForEachCost[3]) 
                    setBorderColor(colorForEachCost[3])
                    break
                case 4: 
                    setBackgroundColor(colorForEachCost[4]) 
                    setBorderColor(colorForEachCost[4])
                    break
                case 5: 
                    setBackgroundColor(colorForEachCost[5]) 
                    setBorderColor(colorForEachCost[5])
                    break
                default: break;
            }
        }
    }, [champData]) 

    useEffect(() => {
        if (unitImage) setImageLoaded(true)
    }, [unitImage, setImageLoaded])

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
        {!champData || !allImagesLoaded ?
            <div className={`${className}_empty`} style={{
                backgroundColor: backgroundColor,
                border: `solid 1px ${borderColor}`
            }}>
                <div className={`${className}_imageContainer`}>
                    <img className={`${className}_image`} src={defaultImage} alt="unitImage" draggable={false} style={{ opacity: 0 }}/>
                    <div className={`${className}_traitsContainer`}>
                        <p style={{ color: backgroundColor, userSelect: 'none' }}>Trait</p>
                        <p style={{ color: backgroundColor, userSelect: 'none' }}>Trait</p>
                    </div>
                </div>
                <div className={`${className}_nameplateContainer`}>
                    <p style={{ color: backgroundColor, userSelect: 'none' }}>No Champ</p>
                    <p style={{ color: backgroundColor, userSelect: 'none' }}>{`0 G`}</p>
                </div>

            </div>
        :
            <div className={className} onClick={handleClick} style={{
                backgroundColor: backgroundColor,
                border: `solid 1px ${borderColor}`
            }}>
                <div className={`${className}_imageContainer`}>
                    <img className={`${className}_image`} src={unitImage} alt="unitImage"/>
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