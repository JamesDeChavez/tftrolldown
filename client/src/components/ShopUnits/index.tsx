import { useContext } from 'react'
import Unit from '../Unit'
import { GameContext } from '../../game/GameContext'
import './styles.css'

const ShopUnits = () => {
    const { champShop } = useContext(GameContext)

    const className = 'ShopUnits'
    return (
        <div className={className}>
            <Unit champData={champShop[0]} key={`Unit_0`} index={0} />
            <Unit champData={champShop[1]} key={`Unit_1`} index={1} />
            <Unit champData={champShop[2]} key={`Unit_2`} index={2} />
            <Unit champData={champShop[3]} key={`Unit_3`} index={3} />
            <Unit champData={champShop[4]} key={`Unit_4`} index={4} />
        </div>
    )
}

export default ShopUnits