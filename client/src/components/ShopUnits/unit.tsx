import React, { useContext } from 'react'
import { GameContext } from '../../GameContext'
import { Game, Unit as UnitClass } from '../../game/classes'
import './styles.css'

interface Props {
    champData: UnitClass | undefined,
    index: number
}

const Unit: React.FC<Props> = ({champData, index}) => {
    const { champShop, setChampShop, champBench, setChampBench, gold, setGold } = useContext(GameContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        console.log(gold)
        if (!champData || champBench.filter(champ => champ !== undefined).length === 9 || gold < champData.cost) return

        const { newBench, newShop } = Game.buyUnit(champShop, champBench, index)
        setChampBench(newBench)
        setChampShop(newShop)
        setGold(prevState => prevState - champData.cost)
    }

    const className = 'Unit'
    return (
        <div className={className} onClick={handleClick}>
            <div className={`${className}_imageContainer`}>
                <div className={`${className}_traitsContainer`}>
                    {!champData ?
                        <p>Traits</p>
                    :
                        champData.traits.map((trait, i) => {
                            return <p key={i}>{trait}</p>
                        })
                    }
                </div>
            </div>
            <div className={`${className}_nameplateContainer`}>
                <p>{!champData ? 'Name' : champData.name}</p>
                <p>{!champData ? 'Cost' : `${champData.cost} G`}</p>
            </div>
        </div>
    )
}

export default Unit