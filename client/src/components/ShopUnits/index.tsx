import { useContext } from 'react'
import Unit from './Unit'
import EmptyUnit from './EmptyUnit'
import { GameContext } from '../../GameContext'
import './styles.css'

const ShopUnits = () => {
    const { champShop } = useContext(GameContext)

    const className = 'ShopUnits'
    return (
        <div className={className}>
            {champShop.length ?            
                champShop.map((champ, i) => {
                    return <Unit champData={champ} key={i} index={i} />
                })
            :
                Array(5).fill(0).map((_, i) => {
                    return <EmptyUnit key={i} />
                })
            }        
        </div>
    )
}

export default ShopUnits