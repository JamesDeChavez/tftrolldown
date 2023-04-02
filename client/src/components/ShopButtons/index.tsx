import { useContext } from 'react'
import { GameContext } from '../../game/GameContext'
import { Game } from '../../game/classes'
import './styles.css'

const ShopButtons = () => {
    const { level, setLevel, cumulativeLevel, setCumulativeLevel, champPool, setChampPool, champShop, setChampShop, gameActive, gold, setGold, setImage1Loaded, setImage2Loaded, setImage3Loaded, setImage4Loaded, setImage5Loaded } = useContext(GameContext)
    
    const handleRefreshClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!gameActive || gold < 2) return
        const { newChampPool, newChampShop } = Game.refreshShop(champPool, champShop, level)
        setChampPool(newChampPool)
        setChampShop(newChampShop)
        setImage1Loaded(false)
        setImage2Loaded(false)
        setImage3Loaded(false)
        setImage4Loaded(false)
        setImage5Loaded(false)
        setGold(prevState => prevState - 2)
    }

    const handleBuyXPClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!gameActive || level === 9 || gold < 4) return
        const { newLevel, newCumulativeLevel } = Game.buyXP(level, cumulativeLevel)
        setLevel(newLevel)
        setCumulativeLevel(newCumulativeLevel)
        setGold(prevState => prevState - 4)
    }

    const className = 'ShopButtons'
    return (
        <div className={className}>
            <div className={`${className}_buyXPContainer`} onClick={handleBuyXPClick}>
                <p>Buy XP</p>
                <p>4 G</p> 
            </div>
            <div className={`${className}_refreshContainer`} onClick={handleRefreshClick}>
                <p>Refresh</p> 
                <p>2 G</p> 
            </div>
        </div>
    )
}

export default ShopButtons