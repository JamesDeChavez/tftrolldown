import React, { useEffect, useState, useRef } from 'react'
import Bench from './components/Bench';
import Gold from './components/Gold';
import Percentages from './components/Percentages';
import ShopButtons from './components/ShopButtons';
import ShopUnits from './components/ShopUnits';
import Level from './components/Level';
import Traits from './components/Traits';
import GameForm from './components/GameForm';
import { Game, LevelRange, Unit } from './game/classes';
import { GameContext } from './GameContext';
import GameTimer from './components/GameTimer';
import SellArea from './components/SellArea';
import './App.css';

const App = () => {
  const [level, setLevel] = useState<LevelRange>(7)
  const [cumulativeLevel, setCumulativeLevel] = useState<number>(74)
  const [gold, setGold] = useState<number>(50)
  const [time, setTime] = useState<number>(50)
  const [champPool, setChampPool] = useState<Unit[]>([])
  const [champShop, setChampShop] = useState<(Unit|undefined)[]>(Array(5).fill(undefined))
  const [champBench, setChampBench] = useState<(Unit|undefined)[]>(Array(9).fill(undefined))
  const [activeTraits, setActiveTraits] = useState<any>({})
  const [gameActive, setGameActive] = useState(false)
  const [sellActive, setSellActive] = useState(false)
  const [sellAreaHovered, setSellAreaHovered] = useState(false)
  const [gameStats, setGameStats] = useState<any>()
  const [gameHistory, setGameHistory] = useState<any>()
  const timeRef = useRef<any>()
  const teamRef = useRef<any>()
  const traitRef = useRef<any>()

  const startGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const startingTime = time
    const startingGold = gold
    const startingLevel = level
    setChampBench(Array(9).fill(undefined))
    const startingDeck = Game.createStartingDeck()
    const { newChampPool, newChampShop } = Game.refreshShop(startingDeck, [], level)
    const newCumulativeLevel = Game.startingCumulativeLevel(level)
    setChampPool(newChampPool)
    setChampShop(newChampShop)
    setCumulativeLevel(newCumulativeLevel)
    setGameActive(true)
    
    let intervalId = setInterval(() => {
      if (timeRef.current <= 0) {
        clearInterval(intervalId)        
        setGameStats({
          startingLevel: startingLevel,
          startingGold: startingGold,
          startingTime: startingTime,
          finalTeam: teamRef.current,
          finalTraits: traitRef.current
        })
        setGameActive(false)
        setTime(startingTime)
        setGold(startingGold)
        setLevel(startingLevel)
      }
      else setTime(prevState => prevState - 1)
    }, 1000)
  }

  const handleKeydownEvent = (e: KeyboardEvent) => {
    e.preventDefault()
    if (!gameActive) return
    if (e.key === 'd' && gold >= 2) {
      const { newChampPool, newChampShop } = Game.refreshShop(champPool, champShop, level)
      setChampPool(newChampPool)
      setChampShop(newChampShop)
      setGold(prevState => prevState - 2)
    }
    if (e.key === 'f' && gold >= 4 && level < 9) {
      const { newLevel, newCumulativeLevel } = Game.buyXP(level, cumulativeLevel)
      setLevel(newLevel)
      setCumulativeLevel(newCumulativeLevel)
      setGold(prevState => prevState - 4)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeydownEvent)
    return () => window.removeEventListener('keydown', handleKeydownEvent)
  })

  useEffect(() => {
    timeRef.current = time
    if (timeRef.current === 0) {
      teamRef.current = champBench
      traitRef.current = activeTraits
    }
  }, [time, champBench, activeTraits])

  useEffect(() => {
    if (!gameActive) {
      const oldStorage = window.sessionStorage.getItem("sessionGames")
      if (!oldStorage && gameStats) {
        window.sessionStorage.setItem("sessionGames", JSON.stringify([gameStats]))
        setGameHistory([gameStats])
      }
      else if (oldStorage && gameStats) {
        const newStorage = [...JSON.parse(oldStorage)]
        newStorage.unshift(gameStats)
        window.sessionStorage.setItem("sessionGames", JSON.stringify(newStorage))
        setGameHistory(newStorage)
      }
      else if (oldStorage && !gameStats) setGameHistory(JSON.parse(oldStorage))
    }
  }, [gameActive, gameStats])

  return (
    <GameContext.Provider value={{
      level, setLevel,
      cumulativeLevel, setCumulativeLevel,
      gold, setGold,
      champPool, setChampPool,
      champShop, setChampShop,
      champBench, setChampBench,
      gameActive,
      time, setTime,
      sellActive, setSellActive,
      sellAreaHovered, setSellAreaHovered,
      activeTraits, setActiveTraits,
      gameHistory, setGameHistory
    }}>
      <div className="App" >
        <GameTimer time={time} gameActive={gameActive} />
        <div className='UpperSection'>
          <div className='TraitsContainer'>
            <Traits/>
          </div>
          <div className='GameFormContainer'>
            <GameForm startGame={startGame} gameActive={gameActive}/>
          </div>
        </div>
        <div className='LowerSection'>
          <div className='BenchContainer'>
            <Bench/>
          </div>
          <div className='DashboardContainer'>
            <Level/>
            <Percentages/>
            <Gold/>
          </div>
          <div className='ShopContainer'>
            <ShopButtons/>
            <div className={`RightShop`}>
              <ShopUnits />
              { sellActive && <SellArea setSellAreaHovered={setSellAreaHovered} /> }
            </div>
            
            
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
