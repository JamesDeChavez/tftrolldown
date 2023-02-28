import { useContext } from 'react'
import { GameContext } from '../../GameContext'
import image from '../../assets/face.png'
import { Game, Unit } from '../../game/classes'
import './styles.css'

interface Props {
    champData: Unit | undefined,
    index: number
}

const BenchUnit: React.FC<Props> = ({champData, index}) => {
    const { champPool, setChampPool, champBench, setChampBench, setGold, gameActive } = useContext(GameContext)

    const sellUnit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        if (!champData || !gameActive) return

        console.log('cost', champData.cost)
        console.log('stars', champData.stars)        

        let goldReceived = champData.cost * Math.pow(3, champData.stars - 1)

        if (champData.stars >= 2) goldReceived-- 

        const { newBench, newChampPool} =  Game.sellUnit(champPool, champBench, index)
        
        setGold(prevState => prevState + goldReceived)
        setChampBench(newBench)
        setChampPool(newChampPool)        
    }

    const className = 'BenchUnit'
    return (
    <>
        {!champData ?
            <div className={className}></div>
        :
            <div className={className} onClick={sellUnit}>
                <div className={`${className}_imageContainer`}>
                    <img src={image} alt="face" className={`${className}_image`} />  
                </div>
                <div className={`${className}_nameplateContainer`}>
                    <span>{champData.name}</span>
                    <span>1 *</span>
                </div>
            </div>
        }
    </>
    )
}

export default BenchUnit