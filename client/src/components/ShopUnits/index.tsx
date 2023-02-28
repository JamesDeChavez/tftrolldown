import { useContext } from 'react'
import Unit from './Unit'
import { GameContext } from '../../GameContext'
import './styles.css'

const ShopUnits = () => {
    const { champShop } = useContext(GameContext)

    const className = 'ShopUnits'
    return (
        <div className={className}>
            {champShop.map((champ, i) => {
                return <Unit champData={champ} key={i} index={i} />
            })}        
        </div>
    )
}

export default ShopUnits