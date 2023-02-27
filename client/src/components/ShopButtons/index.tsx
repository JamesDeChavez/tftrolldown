import { useContext } from 'react'
import { GameContext } from '../../App'
import { Game } from '../../game/classes'
import './styles.css'

const ShopButtons = () => {
    const { level, setLevel, cumulativeLevel, setCumulativeLevel, champPool, setChampPool, champShop, setChampShop, gameActive } = useContext(GameContext)
    
    const handleRefreshClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        const { newChampPool, newChampShop } = Game.refreshShop(champPool, champShop, level)
        setChampPool(newChampPool)
        setChampShop(newChampShop)
    }

    const handleBuyXPClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!gameActive || level === 9) return
        const { newLevel, newCumulativeLevel } = Game.buyXP(level, cumulativeLevel)
        console.log(newLevel, newCumulativeLevel)
        setLevel(newLevel)
        setCumulativeLevel(newCumulativeLevel)
    }

    const className = 'ShopButtons'
    return (
        <div className={className}>
            <div className={`${className}_buttonContainer`} onClick={handleBuyXPClick}>
                <p>Buy XP</p>
                <p>4 G</p> 
            </div>
            <div className={`${className}_buttonContainer`} onClick={handleRefreshClick}>
                <p>Refresh</p> 
                <p>2 G</p> 
            </div>
        </div>
    )
}

export default ShopButtons