import { useContext, useEffect, useState } from 'react'
import Unit from '../Unit'
import { GameContext } from '../../game/GameContext'
import './styles.css'

const ShopUnits = () => {
    const { champShop } = useContext(GameContext)
    const className = 'ShopUnits'
    return (
        <div className={className}>
            {champShop.map((champ, idx) => {
                return <Unit champData={champ} key={`unit_${idx}`} index={idx} />
            })}
        </div>
    )
}

export default ShopUnits