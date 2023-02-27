import React, { useEffect, useState } from 'react'
import Bench from './components/Bench';
import Gold from './components/Gold';
import Percentages from './components/Percentages';
import ShopButtons from './components/ShopButtons';
import ShopUnits from './components/ShopUnits';
import Level from './components/Level';
import Traits from './components/Traits';
import GameForm from './components/GameForm';
import { Game, LevelRange, Unit } from './game/classes';
import './App.css';

export const GameContext = React.createContext<{
  level: LevelRange,
  setLevel: React.Dispatch<React.SetStateAction<LevelRange>>,
  cumulativeLevel: number,
  setCumulativeLevel: React.Dispatch<React.SetStateAction<number>>,
  gold: number,
  setGold: React.Dispatch<React.SetStateAction<number>>,
  champPool: Unit[],
  setChampPool: React.Dispatch<React.SetStateAction<Unit[]>>,
  champShop: (Unit|undefined)[],
  setChampShop: React.Dispatch<React.SetStateAction<(Unit|undefined)[]>>,
  champBench: (Unit|undefined)[],
  setChampBench: React.Dispatch<React.SetStateAction<(Unit|undefined)[]>>,
  gameActive: boolean
}>({
  level: 7,
  setLevel: () => {},
  cumulativeLevel: 0,
  setCumulativeLevel: () => {},
  gold: 50,
  setGold: () => {},
  champPool: [],
  setChampPool: () => {},
  champShop: [],
  setChampShop: () => {},
  champBench: [],
  setChampBench: () => {},
  gameActive: false
})

const App = () => {
  const [level, setLevel] = useState<LevelRange>(7)
  const [cumulativeLevel, setCumulativeLevel] = useState<number>(74)
  const [gold, setGold] = useState<number>(50)
  const [time, setTime] = useState<number>(50)
  const [champPool, setChampPool] = useState<Unit[]>([])
  const [champShop, setChampShop] = useState<(Unit|undefined)[]>([])
  const [champBench, setChampBench] = useState<(Unit|undefined)[]>(Array(9).fill(undefined))
  const [gameActive, setGameActive] = useState(false)

  const startGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const startingDeck = Game.createStartingDeck()
    const { newChampPool, newChampShop } = Game.refreshShop(startingDeck, champShop, level)
    const newCumulativeLevel = Game.startingCumulativeLevel(level)
    setChampPool(newChampPool)
    setChampShop(newChampShop)
    setCumulativeLevel(newCumulativeLevel)
    setGameActive(true)
  }

  useEffect(() => {
    if(!gameActive) return
    console.log(champPool)    
  }, [champPool])
  
  useEffect(() => {
    if(!gameActive) return
    console.log(champShop)    
  }, [champShop])

  useEffect(() => {
    if(!gameActive) return
    console.log(champBench)    
  }, [champBench])

  useEffect(() => {
    if(!gameActive) return
    console.log(cumulativeLevel)    
  }, [cumulativeLevel])

  return (
    <GameContext.Provider value={{
      level, setLevel,
      cumulativeLevel, setCumulativeLevel,
      gold, setGold,
      champPool, setChampPool,
      champShop, setChampShop,
      champBench, setChampBench,
      gameActive
    }}>
      <div className="App">
        <div className='UpperSection'>
          <div className='TraitsContainer'>
            <Traits/>
          </div>
          <div className='GameFormContainer'>
            <GameForm startGame={startGame} />
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
            <ShopUnits/>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
