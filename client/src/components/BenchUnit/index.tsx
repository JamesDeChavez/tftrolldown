import { useState, useContext, useEffect } from 'react'
import { GameContext } from '../../game/GameContext'
import { Game, Unit } from '../../game/classes'
import './styles.css'

interface Props {
    champData: Unit | undefined,
    index: number,
    setSellActive: React.Dispatch<React.SetStateAction<boolean>>
}

const BenchUnit: React.FC<Props> = ({champData, index, setSellActive}) => {
    const { champPool, setChampPool, champBench, setChampBench, setGold, gameActive, sellAreaHovered, setSellAreaHovered, sellKeybind} = useContext(GameContext)
    const [hovered, setHovered] = useState(false)
    const sellAudio = require('../../assets/audio/Sell.mp3')
    let unitImage
    let champNameForImage
    if (champData) {
        champNameForImage = champData.name.replace(/ |'|&/g, '').toLowerCase().charAt(0).toUpperCase() + champData.name.replace(/ |'|&/g, '').toLowerCase().slice(1)
        unitImage = require(`../../assets/tft-champion/webp/TFT9_${champNameForImage}.TFT_Set9.webp`)
    }

    const handleKeydownEvent = (e: KeyboardEvent) => {
        if (!champData || !gameActive || !hovered) return
        
        if (e.key === sellKeybind) {
            let goldReceived = champData.cost * Math.pow(3, champData.stars - 1)
    
            if (champData.stars >= 2) goldReceived-- 
    
            const { newBench, newChampPool} =  Game.sellUnit(champPool, champBench, index)
            const audio = new Audio(sellAudio)
            audio.play()
            setGold(prevState => prevState + goldReceived)
            setChampBench(newBench)
            setChampPool(newChampPool)
            setHovered(false) 
        }
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setHovered(true)
    }

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setHovered(false)
    }

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('drag start')
        if (gameActive) setSellActive(true)
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('drag end')
        if (!champData || !gameActive) return 
        
        if (sellAreaHovered) {
            let goldReceived = champData.cost * Math.pow(3, champData.stars - 1)
    
            if (champData.stars >= 2) goldReceived-- 
    
            const { newBench, newChampPool} =  Game.sellUnit(champPool, champBench, index)
            const audio = new Audio(sellAudio)
            audio.play()
            setGold(prevState => prevState + goldReceived)
            setChampBench(newBench)
            setChampPool(newChampPool)
            setHovered(false) 
        }

        setSellActive(false)
        setSellAreaHovered(false)
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeydownEvent)
        return () => window.removeEventListener('keydown', handleKeydownEvent)
    })

    const className = 'BenchUnit'
    return (
    <>
        {!champData ?
            <div className={`${className}_empty`}></div>
        :
            <div 
                className={className} 
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave} 
                onDragEnter={handleDragEnter}
                onDragEnd={handleDragEnd}
                draggable
            >
                <div className={`${className}_imageContainer`}>
                    <img src={unitImage} alt="face" className={`${className}_image`} />  
                </div>
                <div className={`${className}_nameplateContainer`}>
                    <span>{champData.name}</span>
                    <span>{`${champData.stars} *`}</span>
                </div>
            </div>
        }
    </>
    )
}

export default BenchUnit